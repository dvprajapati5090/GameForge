import { motion } from "framer-motion";
import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSettingsCard from "../components/settings/ProfileSettingsCard";
import SecuritySettingsCard from "../components/settings/SecuritySettingsCard";
import AccountSettingsCard from "../components/settings/AccountSettingsCard";

export default function SettingsPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
            <SettingsHeader />
            <ProfileSettingsCard />
            <SecuritySettingsCard />
            <AccountSettingsCard />
        </motion.div>
    );
}