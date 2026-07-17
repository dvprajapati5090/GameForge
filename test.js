import dns from "dns/promises";

try {
    const result = await dns.resolveSrv(
        "_mongodb._tcp.gameforge.4rb82l9.mongodb.net"
    );

    console.log(result);
} catch (err) {
    console.error(err);
}