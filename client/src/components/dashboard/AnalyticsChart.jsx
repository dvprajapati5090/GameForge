import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import Chart from "react-apexcharts";

export default function AnalyticsChart() {

    const options = {
        chart: { toolbar: { show: false }, background: "transparent", zoom: { enabled: false } },
        theme: { mode: "dark" },
        stroke: { curve: "smooth", width: 2 },
        colors: ["#e8003d"],
        fill: {
            type: "gradient",
            gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.01, stops: [0, 100] }
        },
        markers: { size: 4, strokeWidth: 0, colors: ["#e8003d"], hover: { size: 6 } },
        dataLabels: { enabled: false },
        grid: { borderColor: "rgba(192,192,192,0.07)", strokeDashArray: 4 },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            labels: { style: { colors: "#C0C0C0", fontSize: '10px', fontFamily: '"Space Mono", monospace' } },
            axisBorder: { show: false }, axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: "#C0C0C0", fontSize: '10px', fontFamily: '"Space Mono", monospace' } } },
        tooltip: { theme: "dark" }
    };

    const series = [{ name: "Players", data: [30, 45, 70, 95, 140, 180] }];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
                position: 'relative', overflow: 'hidden',
                borderTop: '2px solid #C0C0C0',
                border: '1px solid rgba(192,192,192,0.1)',
                borderTop: '2px solid #C0C0C0',
                background: '#000000',
                fontFamily: '"Space Mono", monospace',
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            {/* Silver solid badge */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#C0C0C0', padding: '4px 12px', borderRadius: 999 }}>
                                <TrendingUp size={11} color="#000" />
                                <span style={{ fontSize: 9, fontWeight: 700, color: '#000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Analytics</span>
                            </div>
                            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.4), transparent)' }} />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Player Growth</h2>
                        <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>Monthly active players over the last six months.</p>
                    </div>

                    {/* Red stat box */}
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        style={{
                            border: '1px solid #e8003d',
                            background: 'rgba(232,0,61,0.12)',
                            padding: '12px 18px', textAlign: 'right', flexShrink: 0, cursor: 'default',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                            <ArrowUpRight size={13} style={{ color: '#e8003d' }} />
                            <span style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em' }}>+32%</span>
                        </div>
                        <p style={{ marginTop: 3, fontSize: 9, color: '#C0C0C0', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>
                            Since last month
                        </p>
                    </motion.div>
                </div>

                {/* Red→Silver gradient divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d 0%, rgba(192,192,192,0.3) 30%, transparent 70%)', marginBottom: 8 }} />

                <Chart options={options} series={series} type="area" height={280} />
            </div>
        </motion.section>
    );
}