import { useEffect, useMemo, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    category: {
        label: "post_type",
    },
    static_image: {
        label: "static image",
        color: "hsl(var(--chart-1))",
    },
    reel: {
        label: "reel",
        color: "hsl(var(--chart-2))",
    },
    carousel: {
        label: "carousel",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

interface PieChartComponentProps {
    title: string;
    description: string;
    data: object[];
    post_types: string[];
    basedOnColumn: string;
}

export function PieChartComponent({
    title,
    description,
    data,
    post_types,
    basedOnColumn,
}: PieChartComponentProps) {
    const [chartData, setChartData] = useState<object[]>([]);

    useEffect(() => {
        const chartData: {
            category: string;
            [key: string]: number | string;
            fill?: string;
        }[] = [];
        post_types.forEach((type) => {
            const total = data.reduce((acc, curr) => {
                if (
                    curr["category" as keyof typeof curr] === type &&
                    basedOnColumn in curr &&
                    !isNaN(Number(curr[basedOnColumn as keyof typeof curr]))
                ) {
                    return (
                        acc + Number(curr[basedOnColumn as keyof typeof curr])
                    );
                }
                return acc;
            }, 0);

            chartData.push({
                category: type,
                [basedOnColumn]: total,
                fill: chartConfig[type as keyof typeof chartConfig]?.color,
            });
        });

        setChartData(chartData);
    }, [data, post_types, basedOnColumn]);

    const total = useMemo(() => {
        if (chartData.length === 0) {
            return 0;
        }
        return chartData.reduce((acc, curr) => {
            if (!(basedOnColumn in curr)) {
                return acc;
            }
            if (isNaN(Number(curr[basedOnColumn as keyof typeof curr]))) {
                return acc;
            }
            return acc + Number(curr[basedOnColumn as keyof typeof curr]);
        }, 0);
    }, [chartData, basedOnColumn]);

    return (
        <Card className="flex flex-col w-max">
            <CardHeader className="pb-0">
                <CardTitle>Pie Chart - {title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey={basedOnColumn}
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {basedOnColumn}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
