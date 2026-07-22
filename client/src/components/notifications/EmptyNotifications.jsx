import { Bell } from "lucide-react";

export default function EmptyNotifications() {
    return (
        <div className="text-center py-12 px-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Bell className="text-gray-400" size={32} />
            </div>

            <h3 className="text-white font-semibold text-lg">
                No notifications
            </h3>

            <p className="text-gray-400 text-sm mt-2">
                You're all caught up. New updates will appear here.
            </p>
        </div>
    );
}