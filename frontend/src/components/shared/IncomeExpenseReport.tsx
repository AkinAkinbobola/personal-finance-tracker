import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {DateRange} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {IncomeExpense} from "@/types/IncomeExpense.ts";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"

const toLocalDate = (date: Date) => {
    console.log(date.toISOString().split("T")[0]);
    return date.toISOString().split("T")[0];
}

const IncomeExpenseReport = () => {
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const incomeExpenses = useQuery({
        queryKey: ["income-expenses", date?.from, date?.to],
        queryFn: async () => {
            if (!date?.from || !date?.to) return [];
            const response = await axiosInstance.get<IncomeExpense[]>("/reports/income-expense", {
                params: {
                    startDate: date?.from && toLocalDate(date.from),
                    endDate: date?.to && toLocalDate(date.to),
                }
            })
            return response.data;
        },
        enabled: !!date?.from && !!date?.to,
    })

    const chartConfig = {
        income: {
            label: "Income",
            color: "var(--color-chart-1)",
        },
        expenses: {
            label: "Expenses",
            color: "var(--color-chart-2)",
        }
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Income VS. Expenses</CardTitle>
                <CardDescription>{date?.from && date?.to && `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`}</CardDescription>

                <Popover>
                    <PopoverTrigger asChild className={"w-full"}>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "pl-3 text-left font-normal",
                                !date?.from && !date?.to && "text-muted-foreground"
                            )}
                        >
                            {date?.from && date?.to
                                ? `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
                                : "Pick a date range"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={incomeExpenses.data || []}
                        margin={{
                            left: 12,
                            right: 12,
                        }}>
                        <CartesianGrid vertical={false}/>

                        <XAxis
                            dataKey={"date"}
                            tickFormatter={(value: string) => format(new Date(value), "MMM d")}/>

                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                        <Line
                            dataKey={"income"}
                            type={"monotone"}
                            stroke={chartConfig.income.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="expenses"
                            type="monotone"
                            stroke={chartConfig.expenses.color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default IncomeExpenseReport;