/**
 * CreateTournamentPage — Gaming glass wizard theme
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

import StepBasicInfo from "../components/tournaments/create/StepBasicInfo";
import StepDates from "../components/tournaments/create/StepDates";
import StepPrizeRules from "../components/tournaments/create/StepPrizeRules";
import StepReview from "../components/tournaments/create/StepReview";

const F = '"Space Mono", monospace';

const STEPS = ["Basic Info", "Schedule", "Prize & Rules", "Review"];

export default function CreateTournamentPage() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        game: "VALORANT",
        mode: "5V5",
        format: "SINGLE_ELIMINATION",
        description: "",
        banner: "",
        maxTeams: 16,
        registrationStart: "",
        registrationEnd: "",
        tournamentStart: "",
        prizePool: 0,
        rules: "",
        isPaid: false,
        entryFee: 0,
    });

    const canProceed = () => {
        if (step === 1) return Boolean(form.name.trim() && form.game && form.mode && form.format && form.maxTeams);
        if (step === 2) return Boolean(form.registrationStart && form.registrationEnd && form.tournamentStart);
        if (step === 3) {
            if (form.isPaid) return Boolean(form.entryFee > 0 && form.prizePool >= 0 && form.rules.trim());
            return Boolean(form.prizePool >= 0 && form.rules.trim());
        }
        return true;
    };

    const next = () => {
        let message = "";
        if (step === 1 && !form.name.trim()) message = "Tournament name is required.";
        if (step === 2) {
            if (!form.registrationStart) message = "Registration start date is required.";
            else if (!form.registrationEnd) message = "Registration end date is required.";
            else if (!form.tournamentStart) message = "Tournament start date is required.";
        }
        if (step === 3) {
            if (form.isPaid && form.entryFee <= 0) message = "Entry fee is required for paid tournaments.";
            else if (!form.rules.trim()) message = "Tournament rules are required.";
        }
        if (message) {
            setError(message);
            setTimeout(() => setError(""), 3500);
            return;
        }
        setStep(p => p + 1);
    };

    const previous = () => setStep(p => p - 1);

    return (
        <div style={{ fontFamily: F, paddingBottom: 48 }}>
            {/* ── Page header ── */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 32 }}
            >
                <p style={{ fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>
                    // HOST CONTROL
                </p>
                <h1 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    Create Tournament
                </h1>
                <p style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.38)" }}>
                    Build and launch your next esports event.
                </p>
            </motion.div>

            {/* ── Error toast ── */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        style={{
                            marginBottom: 20, padding: "14px 18px",
                            background: "rgba(232,0,61,0.1)",
                            border: "1px solid rgba(232,0,61,0.35)",
                            borderRadius: 12,
                            color: "rgba(255,140,140,0.95)",
                            fontSize: 12, letterSpacing: "0.04em",
                        }}
                    >
                        ⚠ {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Step progress bar ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
                {STEPS.map((label, i) => {
                    const idx = i + 1;
                    const isActive   = step === idx;
                    const isComplete = step > idx;
                    return (
                        <div
                            key={label}
                            style={{
                                padding: "13px 16px",
                                borderRadius: 14,
                                border: isActive
                                    ? "1px solid rgba(232,0,61,0.45)"
                                    : isComplete
                                        ? "1px solid rgba(34,197,94,0.35)"
                                        : "1px solid rgba(255,255,255,0.08)",
                                background: isActive
                                    ? "rgba(232,0,61,0.1)"
                                    : isComplete
                                        ? "rgba(34,197,94,0.08)"
                                        : "rgba(255,255,255,0.025)",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {isComplete ? (
                                    <CheckCircle2 size={13} color="#22c55e" />
                                ) : (
                                    <div style={{
                                        width: 13, height: 13, borderRadius: "50%",
                                        border: `1.5px solid ${isActive ? "#e8003d" : "rgba(255,255,255,0.25)"}`,
                                        background: isActive ? "#e8003d" : "transparent",
                                        flexShrink: 0,
                                    }} />
                                )}
                                <span style={{
                                    fontSize: 10, fontWeight: isActive ? 700 : 400,
                                    color: isActive ? "#fff" : isComplete ? "rgba(34,197,94,0.9)" : "rgba(255,255,255,0.38)",
                                    letterSpacing: "0.04em",
                                    whiteSpace: "nowrap", overflow: "hidden",
                                }}>
                                    {idx}. {label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Step content card ── */}
            <div style={{
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(8,2,14,0.75)",
                backdropFilter: "blur(32px)",
                overflow: "hidden",
                position: "relative",
            }}>
                {/* Neon top stripe */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent 0%, #e8003d 30%, #ff3060 60%, transparent 100%)",
                    boxShadow: "0 0 12px rgba(232,0,61,0.7)",
                }} />

                <div style={{ padding: "32px 32px 28px" }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            {step === 1 && <StepBasicInfo form={form} setForm={setForm} next={next} canProceed={canProceed()} />}
                            {step === 2 && <StepDates form={form} setForm={setForm} next={next} previous={previous} canProceed={canProceed()} />}
                            {step === 3 && <StepPrizeRules form={form} setForm={setForm} next={next} previous={previous} canProceed={canProceed()} />}
                            {step === 4 && <StepReview form={form} previous={previous} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}