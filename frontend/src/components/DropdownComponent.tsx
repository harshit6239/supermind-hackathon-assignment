import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownComponent() {
    const [contentType, setContentType] = useState("All Content");
    const options = ["All Content", "Static", "Reels", "Carousel"];
    const label = useMemo(() => `Content: ${contentType}`, [contentType]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Content Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={contentType}
                    onValueChange={setContentType}
                >
                    {options.map((option) => (
                        <DropdownMenuRadioItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
