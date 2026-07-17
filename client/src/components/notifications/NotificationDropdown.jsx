import InvitationCard from "./InvitationCard";

export default function NotificationDropdown({

    invitations

}) {

    return (

        <div
            className="
                absolute
                right-0
                top-14
                w-96
                rounded-3xl
                border
                border-white/10
                bg-slate-900
                shadow-2xl
                p-6
                z-50
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-5
                "
            >

                <div>

                    <h2 className="text-xl font-black">

                        Notifications

                    </h2>

                    <p className="text-sm text-gray-400 mt-1">

                        {

                            invitations.length

                                ? `You have ${invitations.length} pending invitation${invitations.length > 1 ? "s" : ""}.`

                                : "You're all caught up."

                        }

                    </p>

                </div>

            </div>

            {

                invitations.length > 0

                    ? (

                        <div className="space-y-4">

                            {

                                invitations.map((invitation) => (

                                    <InvitationCard

                                        key={invitation._id}

                                        invitation={invitation}

                                    />

                                ))

                            }

                        </div>

                    )

                    : (

                        <div
                            className="
                                py-10
                                text-center
                                text-gray-400
                            "
                        >

                            No pending invitations.

                        </div>

                    )

            }

        </div>

    );

}