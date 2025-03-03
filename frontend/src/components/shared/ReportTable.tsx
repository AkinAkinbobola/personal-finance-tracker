import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";
import MultipleSelector, {Option} from "@/components/ui/multi-select.tsx";
import {capitalize, cn, formatMoney, toLocalDate} from "@/lib/utils.ts";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {DateRange} from "react-day-picker";
import {Report} from "@/types/Report.ts";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/shared/DataTable.tsx";

const ReportTable = () => {
    const [categoryValue, setCategoryValue] = useState<Option[]>([])
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const columns: ColumnDef<Report>[] = [
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({row}) => {
                return <div>{capitalize(row.getValue("category"))}</div>
            }
        },
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({row}) => {
                return <div>{formatMoney(parseFloat(row.getValue("amount")))}</div>
            }
        }
    ]


    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance.get<Category[]>("/categories")
            return response.data;
        },
    })


    const OPTIONS: Option[] = categories.data ? categories.data.map(category => ({
        label: capitalize(category.name),
        value: category.name,
    })) : [];


    const report = useQuery({
        queryKey: ["reports", date?.from, date?.to, categoryValue],
        queryFn: async () => {
            if (!date?.from || !date?.to) return [];

            const response = await axiosInstance.get<Report[]>("/reports", {
                params: {
                    startDate: toLocalDate(date.from),
                    endDate: toLocalDate(date.to),
                    categories: categoryValue.map((category) => category.value),
                },
                paramsSerializer: {
                    indexes: null
                }
            })
            return response.data;
        }
    })


    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Financial Reports
                </CardTitle>
                <CardDescription>
                    Analyze your income and expenses over time, filter by categories, and export your reports in common
                    formats
                </CardDescription>
            </CardHeader>

            <CardContent className={"space-y-4"}>
                <div className={"flex items-center justify-between gap-8"}>
                    <MultipleSelector
                        options={OPTIONS}
                        value={categoryValue}
                        onChange={setCategoryValue}
                        placeholder={"Select categories"}
                        emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                no results found.
                            </p>
                        }
                    />

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
                </div>

                <div>
                    {
                        report.data &&
                        <DataTable columns={columns} data={report.data}/>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportTable;