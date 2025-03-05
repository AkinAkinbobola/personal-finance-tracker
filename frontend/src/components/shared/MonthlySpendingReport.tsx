import {MonthlySpending} from "@/types/MonthlySpending.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect, useState} from "react";


interface MonthlySpendingReportProps {
    monthlySpendingMonth: String | undefined;
    setMonthlySpendingMonth: (month: String | undefined) => void;
    monthlySpendingData: MonthlySpending[]
}

const months = Array.from({length: 12}).map((_, i) => ({
    value: String(i + 1),
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
         setMonthlySpendingMonth,
         monthlySpendingMonth,
         monthlySpendingData
     }: MonthlySpendingReportProps) => {
        const [selectedMonth, setSelectedMonth] = useState<String | undefined>(undefined)
        const [selectedYear, setSelectedYear] = useState<String | undefined>(undefined)

        useEffect(() => {
            if (selectedMonth && selectedYear){
                setMonthlySpendingMonth(`${selectedYear}-${selectedMonth}`)
            }
        }, [selectedMonth, selectedYear]);


        return (
            <div className={"w-1/2"}>
                <div className={"flex items-center justify-between"}>
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
        );
    };

export default MonthlySpendingReport;