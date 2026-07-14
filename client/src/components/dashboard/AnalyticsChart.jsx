import Chart from "react-apexcharts";

export default function AnalyticsChart() {

    const options = {

        chart: {
            toolbar: {
                show: false
            },
            background: "transparent"
        },

        theme: {
            mode: "dark"
        },

        stroke: {
            curve: "smooth",
            width: 4
        },

        colors: [
            "#22D3EE"
        ],

        xaxis: {

            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ]

        },

        grid: {

            borderColor: "#334155"

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

        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
            "
        >

            <h2 className="text-2xl font-bold mb-5">
                Player Growth
            </h2>

            <Chart
                options={options}
                series={series}
                type="area"
                height={320}
            />

        </div>

    );

}