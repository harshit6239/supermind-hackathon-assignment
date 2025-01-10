import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80, other: 20 },
//     { month: "February", desktop: 305, mobile: 200, other: 30 },
//     { month: "March", desktop: 237, mobile: 120, other: 40 },
//     { month: "April", desktop: 73, mobile: 190, other: 50 },
//     { month: "May", desktop: 209, mobile: 130, other: 60 },
//     { month: "June", desktop: 214, mobile: 140, other: 70 },
// ];

const chartConfig = {
    likes: {
        label: "Likes",
        color: "#2563eb",
    },
    comments: {
        label: "Comments",
        color: "#60a5fa",
    },
    shares: {
        label: "Shares",
        color: "#93c5fd",
    },
} satisfies ChartConfig;

function accumulateDataByMonth(data: object[]) {
    const accumulatedData: {
        [key: string]: {
            month: string;
            likes: number;
            comments: number;
            shares: number;
        };
    } = {};

    data.forEach((item: any) => {
        if (!item.date) return;
        const month = item.date.slice(0, 7); // Assuming 'date' is in 'YYYY-MM-DD' format
        if (!accumulatedData[month]) {
            accumulatedData[month] = {
                month,
                likes: 0,
                comments: 0,
                shares: 0,
            };
        }
        accumulatedData[month].likes += item.likes;
        accumulatedData[month].comments += item.comments;
        accumulatedData[month].shares += item.shares;
    });

    return Object.values(accumulatedData);
}

export function BarChartComponent({ data }: { data: object[] }) {
    const accumulatedData = accumulateDataByMonth(data);

    return (
        <ChartContainer
            config={chartConfig}
            className="w-full"
        >
            <BarChart
                accessibilityLayer
                data={accumulatedData}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 7)}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    dataKey="likes"
                    fill={chartConfig.likes.color}
                    radius={4}
                />
                <Bar
                    dataKey="comments"
                    fill={chartConfig.comments.color}
                    radius={4}
                />
                <Bar
                    dataKey="shares"
                    fill={chartConfig.shares.color}
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
}
