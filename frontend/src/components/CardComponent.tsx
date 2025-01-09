import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

// const dummyData = [
//     { title: "likes", value: "1,200" },
//     { title: "comment", value: "1,200" },
//     { title: "shares", value: "1,200" },
// ];

interface CardComponentProps {
    title: string;
    description: string;
    data: { title: string; value: string; category: string }[];
}

export function CardComponent({
    title,
    description,
    data,
}: CardComponentProps) {
    const [cardData, setCardData] = useState<
        { title: string; value: number }[]
    >([]);

    useEffect(() => {
        const totalPosts = data.length;
        const totalReels = data.filter(
            (post: { category: string }) => post.category === "reel"
        ).length;
        const totalStaticImages = data.filter(
            (post: { category: string }) => post.category === "static_image"
        ).length;
        const totalCarousels = data.filter(
            (post: { category: string }) => post.category === "carousel"
        ).length;

        setCardData([
            { title: "total posts", value: totalPosts },
            { title: "total reels", value: totalReels },
            { title: "total carousels", value: totalCarousels },
            { title: "total static images", value: totalStaticImages },
        ]);
    }, [data]);

    return (
        <Card className="w-max">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 justify-evenly">
                    {cardData.map(({ title, value }) => (
                        <div
                            key={title}
                            className="flex flex-col justify-center "
                        >
                            {title.charAt(0).toUpperCase() + title.slice(1)}
                            <div className="text-3xl font-bold">{value}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
