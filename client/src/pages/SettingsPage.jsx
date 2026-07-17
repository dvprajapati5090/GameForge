import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSettingsCard from "../components/settings/ProfileSettingsCard";
import SecuritySettingsCard from "../components/settings/SecuritySettingsCard";
import AccountSettingsCard from "../components/settings/AccountSettingsCard";

export default function SettingsPage() {

    return (

        <div className="space-y-8">

            <SettingsHeader />

            <ProfileSettingsCard />

            <SecuritySettingsCard />

            <AccountSettingsCard />

        </div>

    );

}