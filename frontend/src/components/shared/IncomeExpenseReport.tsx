import {Calendar} from "@/components/ui/calendar.tsx";
import {DateRange} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn, downloadFile, formatMoney, toLocalDate} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {CardContent} from "@/components/ui/card.tsx";
import {IncomeExpense} from "@/types/IncomeExpense.ts";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/shared/DataTable.tsx";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";

interface IncomeExpenseReportProps {
    setIncomeExpenseDateRange: (dateRange: DateRange | undefined) => void
    incomeExpenseDateRange: DateRange | undefined
    incomeExpenseData: IncomeExpense[]
}

const IncomeExpenseReport =
    (
        {
            setIncomeExpenseDateRange,
            incomeExpenseDateRange,
            incomeExpenseData
        }: IncomeExpenseReportProps
    ) => {

        const exportFile = useMutation({
            mutationFn: async () => {
                if (!incomeExpenseDateRange?.from || !incomeExpenseDateRange?.to) {
                    return;
                }

                const response = await axiosInstance.get("/reports/income-expense-csv", {
                    params: {
                        startDate: toLocalDate(incomeExpenseDateRange.from),
                        endDate: toLocalDate(incomeExpenseDateRange.to)
                    },
                    responseType: "blob"
                })

                downloadFile(response, "income-expense")
            }
        })

        const columns: ColumnDef<IncomeExpense> [] = [
            {
                accessorKey: "date",
                header: "Date",
                cell: ({row}) => {
                    return <div>{format(row.getValue("date"), "MMM dd yyyy")}</div>
                }
            },
            {
                accessorKey: "income",
                header: "Income",
                cell: ({row}) => {
                    return <div>{formatMoney(row.getValue("income"))}</div>
                }
            },
            {
                accessorKey: "expenses",
                header: "Expense",
                cell: ({row}) => {
                    return <div>{formatMoney(row.getValue("expenses"))}</div>
                }
            }
        ]

        return (
            <CardContent className={"space-y-4"}>
                <Popover>
                    <div className={"flex justify-end"}>
                        <PopoverTrigger asChild className={"w-fit"}>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "pl-3 text-left font-normal",
                                    !incomeExpenseDateRange?.from && !incomeExpenseDateRange?.to && "text-muted-foreground"
                                )}
                            >
                                {incomeExpenseDateRange?.from && incomeExpenseDateRange?.to
                                    ? `${format(incomeExpenseDateRange.from, "PPP")} - ${format(incomeExpenseDateRange.to, "PPP")}`
                                    : "Pick a date range"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                    </div>

                    <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={incomeExpenseDateRange}
                            onSelect={setIncomeExpenseDateRange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <DataTable columns={columns} data={incomeExpenseData}/>

                <Button onClick={() => exportFile.mutate()} disabled={incomeExpenseData.length == 0}>
                    Export
                </Button>
            </CardContent>
        );
    };

export default IncomeExpenseReport;