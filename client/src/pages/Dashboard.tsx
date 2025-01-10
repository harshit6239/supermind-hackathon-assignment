import { AreaChartComponent } from "../components/AreaChartComponent";
import { PieChartComponent } from "../components/PieChartComponent";
import { CardComponent } from "../components/CardComponent";
import { DateRangeComponent } from "../components/DateRangeComponent";
import { BarChartComponent } from "@/components/BarChartComponent";
import ChatboxComponent from "@/components/ChatboxComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Papa from "papaparse";

interface PostData {
    date: string;
    likes: number;
    comments: number;
    shares: number;
    category: string;
}

export default function Dashboard() {
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<PostData[]>([]);
    const [filteredData, setFilteredData] = useState<PostData[]>([]);
    const [dateRange, setDateRange] = useState<{
        startDate: string;
        endDate: string;
    }>({
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        axios.get("https://socialmetric.onrender.com/api/data").then((resp) => {
            const parsed = Papa.parse(resp.data, { header: true });
            if (parsed.meta.fields) {
                setColumns(parsed.meta.fields);
            }
            const newParsedData = (
                parsed.data as Record<string, string | number>[]
            ).map((row) => {
                if (
                    row["likes"] === undefined ||
                    row["comments"] === undefined ||
                    row["shares"] === undefined ||
                    row["category"] === undefined
                ) {
                    return {
                        date: row["date"],
                        category: "static_image",
                        likes: 0,
                        comments: 0,
                        shares: 0,
                    };
                }
                return {
                    ...row,
                    likes: Number(row["likes" as keyof typeof row]),
                    comments: Number(row["comments" as keyof typeof row]),
                    shares: Number(row["shares" as keyof typeof row]),
                };
            });
            setData(newParsedData as PostData[]);

            if (newParsedData.length > 0) {
                const startDate = newParsedData[0].date as string;
                const endDate = newParsedData[newParsedData.length - 1]
                    .date as string;
                setDateRange({ startDate, endDate });
            }
        });
    }, []);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const filtered = data.filter((item: PostData) => {
                const itemDate = new Date(item.date);
                return (
                    itemDate >= new Date(dateRange.startDate) &&
                    itemDate <= new Date(dateRange.endDate)
                );
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [dateRange, data]);

    return (
        <div className="flex flex-col gap-4 p-8 ">
            <h1 className="font-bold mb-4">Dashboard</h1>

            <div className="flex justify-between ">
                <DateRangeComponent
                    onChange={setDateRange}
                    initialRange={dateRange}
                />
                {/* <DropdownComponent /> */}
            </div>
            <div className="w-max-content h-full flex flex-col gap-4 ">
                <div className="flex gap-4 w-full">
                    <CardComponent
                        title="Post Information"
                        description="Total posts, reels, carousels, and static images"
                        data={filteredData.map((item) => ({
                            title: item.category,
                            value: `${
                                item.likes + item.comments + item.shares
                            }`,
                            category: item.category,
                        }))}
                    />
                    {filteredData.length > 0 &&
                        ["likes", "comments", "shares"].map(
                            (basedOnColumn, index) => (
                                <PieChartComponent
                                    key={index}
                                    title={"Post Distribution"}
                                    description={
                                        basedOnColumn +
                                        " breakdown by post type"
                                    }
                                    data={filteredData}
                                    post_types={[
                                        "static_image",
                                        "reel",
                                        "carousel",
                                    ]}
                                    basedOnColumn={basedOnColumn}
                                />
                            )
                        )}
                </div>
                <div className="flex gap-4 w-full">
                    <AreaChartComponent
                        title="Post Engagement Over Time"
                        description="Likes, comments, and shares over time"
                        data={filteredData}
                    />
                    <BarChartComponent data={filteredData} />
                </div>
                <div>
                    <h2 className="font-bold mb-4">Data Table</h2>
                    <table className="min-w-full bg-gray-800 text-white">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column}
                                        className="py-2 px-4 border-b border-gray-700 bg-gray-900 text-left text-sm font-semibold text-gray-300"
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((column) => (
                                        <td
                                            key={column}
                                            className="py-2 px-4 border-b border-gray-700 text-sm text-gray-300"
                                        >
                                            {row[column as keyof PostData]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ChatboxComponent />
            </div>
        </div>
    );
}
