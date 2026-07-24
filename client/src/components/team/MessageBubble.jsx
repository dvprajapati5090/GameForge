import useAuthStore from "../../store/authStore";

import getProfileImage from "../../utils/getProfileImage";

export default function MessageBubble({ message }) {

    const { user } = useAuthStore();

    const mine = message.sender._id === user?._id;

    const profileImage = getProfileImage(message.sender);

    return (

        <div
            className={`flex mb-5 ${
                mine ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`flex gap-3 max-w-[75%] ${
                    mine ? "flex-row-reverse" : ""
                }`}
            >

                <img
                    src={profileImage}
                    alt={message.sender.displayName}
                    className="
                        w-10
                        h-10
                        rounded-full
                        object-cover
                        border
                        border-cyan-500/30
                    "
                />

                <div>

                    <div
                        className={`flex items-center gap-2 ${
                            mine
                                ? "justify-end"
                                : ""
                        }`}
                    >

                        <span className="font-semibold">

                            {message.sender.displayName}

                        </span>

                        <span className="text-xs text-gray-400">

                            {new Date(
                                message.createdAt
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}

                        </span>

                    </div>

                    <div
                        className={`
                            mt-1
                            px-4
                            py-3
                            rounded-2xl
                            break-words
                            ${
                                mine
                                    ? "bg-cyan-500 text-black rounded-br-md"
                                    : "bg-slate-800 rounded-bl-md"
                            }
                        `}
                    >

                        {message.text}

                    </div>

                </div>

            </div>

        </div>

    );

}