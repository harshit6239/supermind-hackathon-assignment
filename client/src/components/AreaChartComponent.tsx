import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    likes: {
        label: "Likes",
        color: "hsl(var(--chart-1))",
    },
    comments: {
        label: "Comments",
        color: "hsl(var(--chart-2))",
    },
    shares: {
        label: "Shares",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function AreaChartComponent({
    title,
    description,
    data,
}: {
    title: string;
    description: string;
    data: object[];
}) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date" // Assuming 'date' is the key for x-axis data
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 10)} // Format date if necessary
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="likes"
                            type="natural"
                            fill="var(--color-likes)"
                            fillOpacity={0.4}
                            stroke="var(--color-likes)"
                            stackId="a"
                        />
                        <Area
                            dataKey="comments"
                            type="natural"
                            fill="var(--color-comments)"
                            fillOpacity={0.4}
                            stroke="var(--color-comments)"
                            stackId="a"
                        />
                        <Area
                            dataKey="shares"
                            type="natural"
                            fill="var(--color-shares)"
                            fillOpacity={0.4}
                            stroke="var(--color-shares)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                {/* <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div> */}
            </CardFooter>
        </Card>
    );
}
