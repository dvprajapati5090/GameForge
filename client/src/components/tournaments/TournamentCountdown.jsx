import { useEffect, useState } from "react";

export default function TournamentCountdown({ targetDate, title }) {

    const calculate = () => {

        const diff = new Date(targetDate) - new Date();

        if (diff <= 0) {

            return null;

        }

        return {

            days: Math.floor(diff / (1000 * 60 * 60 * 24)),

            hours: Math.floor(diff / (1000 * 60 * 60)) % 24,

            minutes: Math.floor(diff / (1000 * 60)) % 60,

            seconds: Math.floor(diff / 1000) % 60

        };

    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {

        const interval = setInterval(() => {

            setTime(calculate());

        }, 1000);

        return () => clearInterval(interval);

    }, [targetDate]);

    if (!time) {

        return (

            <div className="text-green-400 font-bold">

                LIVE

            </div>

        );

    }

    return (

        <div>

            <p className="text-gray-400 text-sm">

                {title}

            </p>

            <div className="flex gap-4 mt-2">

                <TimeBox value={time.days} label="Days"/>

                <TimeBox value={time.hours} label="Hours"/>

                <TimeBox value={time.minutes} label="Minutes"/>

                <TimeBox value={time.seconds} label="Seconds"/>

            </div>

        </div>

    );

}

function TimeBox({ value, label }) {

    return (

        <div className="rounded-xl bg-slate-800 px-4 py-3 text-center">

            <h2 className="text-2xl font-black text-cyan-400">

                {String(value).padStart(2, "0")}

            </h2>

            <p className="text-xs text-gray-400">

                {label}

            </p>

        </div>

    );

}