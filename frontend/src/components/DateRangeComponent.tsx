import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangeComponent({
    className,
    onChange,
    initialRange,
}: React.HTMLAttributes<HTMLDivElement> & {
    onChange: (range: { startDate: string; endDate: string }) => void;
    initialRange: { startDate: string; endDate: string };
}) {
    const initialFromDate = new Date(initialRange.startDate);
    const initialToDate = new Date(initialRange.endDate);

    const [date, setDate] = React.useState<DateRange | undefined>(
        !isNaN(initialFromDate.getTime()) && !isNaN(initialToDate.getTime())
            ? { from: initialFromDate, to: initialToDate }
            : undefined
    );

    React.useEffect(() => {
        if (date?.from && date?.to) {
            onChange({
                startDate: format(date.from, "yyyy-MM-dd"),
                endDate: format(date.to, "yyyy-MM-dd"),
            });
        }
    }, [date, onChange]);

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"secondary"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                >
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
