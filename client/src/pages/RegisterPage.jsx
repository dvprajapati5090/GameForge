import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import RegisterWizard from "../components/register/RegisterWizard";

const VALORANT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";

export default function RegisterPage() {
  const location = useLocation();
  const googleData = location.state?.googleData;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        fontFamily: '"Space Mono", monospace',
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Full-page video bg */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={VALORANT_VIDEO}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.4,
        }}
      />
      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Black gradient overlay top + bottom */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
          padding: "24px 12px",
        }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}
          >
            GameForge // Registration
          </span>
        </motion.div>

        <RegisterWizard googleData={googleData} />
      </div>
    </div>
  );
}
