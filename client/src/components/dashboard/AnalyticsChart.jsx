import { TrendingUp, ArrowUpRight } from "lucide-react";
import Chart from "react-apexcharts";

export default function AnalyticsChart() {

    const options = {

        chart: {

            toolbar: {
                show: false
            },

            background: "transparent",

            zoom: {
                enabled: false
            }

        },

        theme: {
            mode: "dark"
        },

        stroke: {

            curve: "smooth",

            width: 4

        },

        colors: [
            "#8B5CF6"
        ],

        fill: {

            type: "gradient",

            gradient: {

                shadeIntensity: 1,

                opacityFrom: 0.45,

                opacityTo: 0.05,

                stops: [0, 100]

            }

        },

        markers: {

            size: 5,

            strokeWidth: 0,

            colors: ["#8B5CF6"],

            hover: {

                size: 7

            }

        },

        dataLabels: {
            enabled: false
        },

        grid: {

            borderColor: "rgba(255,255,255,0.08)",

            strokeDashArray: 5

        },

        xaxis: {

            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            labels: {

                style: {

                    colors: "#94A3B8"

                }

            },

            axisBorder: {
                show: false
            },

            axisTicks: {
                show: false
            }

        },

        yaxis: {

            labels: {

                style: {

                    colors: "#94A3B8"

                }

            }

        },

        tooltip: {

            theme: "dark"

        }

    };

    const series = [

        {

            name: "Players",

            data: [
                30,
                45,
                70,
                95,
                140,
                180
            ]

        }

    ];

    return (

        <section
            className="
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/10

                bg-[#101624]

                backdrop-blur-2xl

                p-6

                transition-all
                duration-300

                hover:border-violet-500/20
                hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]
            "
        >

            {/* Ambient Glow */}

            <div
                className="
                    absolute
                    -top-24
                    right-0

                    h-72
                    w-72

                    rounded-full

                    bg-violet-500/10

                    blur-[130px]
                "
            />

            <div className="relative z-10">

                {/* Header */}

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2

                                rounded-full

                                border
                                border-violet-500/20

                                bg-violet-500/10

                                px-3
                                py-1

                                text-xs
                                font-semibold

                                uppercase

                                tracking-[2px]

                                text-violet-300
                            "
                        >

                            <TrendingUp size={14} />

                            Analytics

                        </div>

                        <h2
                            className="
                                mt-4

                                text-3xl
                                font-bold

                                text-white
                            "
                        >
                            Player Growth
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">

                            Monthly active players over the last six months.

                        </p>

                    </div>

                    <div
                        className="
                            rounded-2xl

                            border
                            border-emerald-500/20

                            bg-emerald-500/10

                            px-4
                            py-3
                        "
                    >

                        <div className="flex items-center gap-2">

                            <ArrowUpRight
                                size={16}
                                className="text-emerald-400"
                            />

                            <span className="text-xl font-bold text-white">

                                +32%

                            </span>

                        </div>

                        <p className="text-xs text-slate-400 mt-1">

                            Since last month

                        </p>

                    </div>

                </div>

                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={320}
                />

            </div>

        </section>

    );

}