/**
 * Challonge API v2.1 Service
 * Uses OAuth2 Client Credentials flow (server-to-server).
 * The access token is cached in-memory and refreshed automatically on expiry.
 */

import axios from "axios";

const CHALLONGE_BASE = "https://api.challonge.com/v2.1";
const TOKEN_URL = "https://api.challonge.com/oauth/token";

let _accessToken = null;
let _tokenExpiresAt = 0; // Unix ms

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Fetch (or reuse) a valid OAuth2 access token via client-credentials flow.
 */
const getAccessToken = async () => {

    const now = Date.now();

    // Return cached token if it is still valid (with 60-second buffer)
    if (_accessToken && now < _tokenExpiresAt - 60_000) {
        return _accessToken;
    }

    const clientId = process.env.CHALLONGE_CLIENT_ID;
    const clientSecret = process.env.CHALLONGE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error(
            "Challonge credentials missing. Set CHALLONGE_CLIENT_ID and CHALLONGE_CLIENT_SECRET in .env"
        );
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const { data } = await axios.post(TOKEN_URL, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    _accessToken = data.access_token;

    // Challonge returns expires_in in seconds
    _tokenExpiresAt = now + (data.expires_in ?? 7200) * 1000;

    console.log("[Challonge] OAuth2 token obtained, expires in", data.expires_in, "s");

    return _accessToken;

};

/**
 * Build an authenticated Axios instance for a single request.
 */
const challongeClient = async () => {

    const token = await getAccessToken();

    return axios.create({
        baseURL: CHALLONGE_BASE,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    });

};

// ---------------------------------------------------------------------------
// Public API methods
// ---------------------------------------------------------------------------

/**
 * Create a new Challonge tournament.
 * @param {string} name         - Display name of the tournament
 * @param {string} urlSlug      - URL-safe unique slug (e.g. "gameforge-xyz123")
 * @param {string} type         - "single elimination" | "double elimination" | "round robin" | "swiss"
 * @param {string|null} gameName - Optional game name for Challonge's tagging
 * @returns {{ challongeId: string, challongeUrl: string }}
 */
export const createChallongeTournament = async (name, urlSlug, type = "single elimination", gameName = null) => {

    const client = await challongeClient();

    const payload = {
        data: {
            type: "Tournament",
            attributes: {
                name,
                url: urlSlug,
                tournament_type: type,
                ...(gameName ? { game_name: gameName } : {})
            }
        }
    };

    const { data } = await client.post("/tournaments.json", payload);

    const attrs = data.data.attributes;
    const id = data.data.id;

    return {
        challongeId: id,
        challongeUrl: attrs.full_challonge_url ?? `https://challonge.com/${urlSlug}`
    };

};

/**
 * Add multiple participants to a Challonge tournament.
 * @param {string} challongeId  - Challonge tournament ID
 * @param {{ name: string, seed?: number }[]} participants
 * @returns {ChallongeParticipant[]} - Array with id and name for each added participant
 */
export const addParticipants = async (challongeId, participants) => {

    const client = await challongeClient();

    const results = [];

    for (const participant of participants) {

        const payload = {
            data: {
                type: "Participant",
                attributes: {
                    name: participant.name,
                    ...(participant.seed != null ? { seed: participant.seed } : {})
                }
            }
        };

        const { data } = await client.post(
            `/tournaments/${challongeId}/participants.json`,
            payload
        );

        results.push({
            id: data.data.id,
            name: data.data.attributes.name
        });

    }

    return results;

};

/**
 * Start (randomize and open) a Challonge tournament.
 * This locks participants and generates the match tree.
 * @param {string} challongeId
 */
export const startChallongeTournament = async (challongeId) => {

    const client = await challongeClient();

    await client.post(`/tournaments/${challongeId}/start.json`);

    console.log(`[Challonge] Tournament ${challongeId} started.`);

};

/**
 * Fetch all matches for a tournament.
 * @param {string} challongeId
 * @returns {ChallongeMatch[]}
 */
export const getChallongeMatches = async (challongeId) => {

    const client = await challongeClient();

    const { data } = await client.get(
        `/tournaments/${challongeId}/matches.json`
    );

    // data.data is an array of JSON:API match objects
    return (data.data ?? []).map(m => ({
        challongeMatchId: m.id,
        round: m.attributes.round,
        player1Id: m.attributes.player1_id,
        player2Id: m.attributes.player2_id,
        state: m.attributes.state, // "open" | "complete" | "pending"
        winnerId: m.attributes.winner_id,
        scoresCsv: m.attributes.scores_csv,
    }));

};

/**
 * Fetch all participants for a tournament.
 * @param {string} challongeId
 * @returns {{ id: number, name: string, seed: number }[]}
 */
export const getChallongeParticipants = async (challongeId) => {

    const client = await challongeClient();

    const { data } = await client.get(
        `/tournaments/${challongeId}/participants.json`
    );

    return (data.data ?? []).map(p => ({
        id: p.id,
        name: p.attributes.name,
        seed: p.attributes.seed,
    }));

};

/**
 * Report match result to Challonge.
 * @param {string} challongeId      - Challonge tournament ID
 * @param {string|number} challongeMatchId - Challonge match ID
 * @param {string|number} winnerId  - Challonge participant ID of the winner
 * @param {number} scoreA           - Score for player1
 * @param {number} scoreB           - Score for player2
 */
export const reportChallongeMatchResult = async (
    challongeId,
    challongeMatchId,
    winnerId,
    scoreA,
    scoreB
) => {

    const client = await challongeClient();

    const payload = {
        data: {
            type: "Match",
            attributes: {
                winner_id: winnerId,
                scores_csv: `${scoreA}-${scoreB}`,
            }
        }
    };

    await client.put(
        `/tournaments/${challongeId}/matches/${challongeMatchId}.json`,
        payload
    );

    console.log(`[Challonge] Match ${challongeMatchId} result reported: winner=${winnerId}, score=${scoreA}-${scoreB}`);

};

/**
 * Finalize (complete) a Challonge tournament.
 * @param {string} challongeId
 */
export const finalizeChallongeTournament = async (challongeId) => {

    const client = await challongeClient();

    await client.post(`/tournaments/${challongeId}/finalize.json`);

    console.log(`[Challonge] Tournament ${challongeId} finalized.`);

};
