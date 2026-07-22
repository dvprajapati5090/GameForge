import NotificationItem from "./NotificationItem";
import EmptyNotifications from "./EmptyNotifications";

export default function NotificationPanel({

    notifications

}) {

    if (!notifications.length) {

        return <EmptyNotifications />;

    }

    return (

        <div className="space-y-3">

            {

                notifications.map((notification) => (

                    <NotificationItem

                        key={notification._id}

                        notification={notification}

                    />

                ))

            }

        </div>

    );

}