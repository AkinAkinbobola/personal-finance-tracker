import {MonthlySpending} from "@/types/MonthlySpending.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useEffect, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/shared/DataTable.tsx";
import {capitalize, downloadFile, formatMoney} from "@/lib/utils.ts";
import {format} from "date-fns";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Button} from "@/components/ui/button.tsx";


interface MonthlySpendingReportProps {
    monthlySpendingMonth: String | undefined;
    setMonthlySpendingMonth: (month: String | undefined) => void;
    monthlySpendingData: MonthlySpending[]
}

const months = Array.from({length: 12}).map((_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: new Date(0, i).toLocaleString("en", {month: "long"})
}));

const years = Array.from(
    {length: new Date().getFullYear() - 2010 + 1},
    (_, i) => {
        const year = new Date().getFullYear() - i;
        return {value: String(year), label: String(year)};
    }
);

const MonthlySpendingReport =
    ({
         monthlySpendingMonth,
         setMonthlySpendingMonth,
         monthlySpendingData
     }: MonthlySpendingReportProps) => {
        const [selectedMonth, setSelectedMonth] = useState<String | undefined>(undefined)
        const [selectedYear, setSelectedYear] = useState<String | undefined>(undefined)

        const exportFile = useMutation({
            mutationFn: async () => {
                const response = await axiosInstance.get("/reports/monthly-spending-csv", {
                    params: {
                        month: monthlySpendingMonth
                    },
                    responseType: "blob"
                })
                downloadFile(response, `monthly-spending-${monthlySpendingMonth}`)
            }
        })

        const columns: ColumnDef<MonthlySpending>[] = [
            {
                accessorKey: "categoryName",
                header: "Category",
                cell: ({row}) => {
                    return <div>{capitalize(row.getValue("categoryName"))}</div>
                }
            },
            {
                accessorKey: "totalSpent",
                header: `Amount Spent${monthlySpendingMonth ? ` (${format(new Date(monthlySpendingMonth as string), "MMMM yyyy")})` : ""}`,
                cell: ({row}) => {
                    return <div>{formatMoney(row.getValue("totalSpent"))}</div>
                }
            }
        ]

        useEffect(() => {
            if (selectedMonth && selectedYear) {
                setMonthlySpendingMonth(`${selectedYear}-${selectedMonth}`)
            }
        }, [selectedMonth, selectedYear]);


        return (
            <div className={"space-y-4"}>
                <div className={"flex justify-end"}>
                    <div className={"flex items-center justify-between gap-5"}>
                        <Select onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Month"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    months.map(month => (
                                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        <Select onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Year"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    years.map(year => (
                                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <DataTable
                    columns={columns}
                    data={monthlySpendingData}
                />

                <Button onClick={() => exportFile.mutate()} disabled={monthlySpendingData.length === 0}>
                    Export
                </Button>
            </div>
        );
    };

export default MonthlySpendingReport;