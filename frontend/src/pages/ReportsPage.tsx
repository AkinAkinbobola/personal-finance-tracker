import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {useState} from "react";
import MonthlySpendingReport from "@/components/shared/MonthlySpendingReport.tsx";
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {IncomeExpense} from "@/types/IncomeExpense.ts";
import {DateRange} from "react-day-picker";
import IncomeExpenseReport from "@/components/shared/IncomeExpenseReport.tsx";
import {format} from "date-fns";

const formatDate = (date: Date | undefined) => {
    if (!date) {
        return null
    }
    return format(date, "yyyy-MM-dd");
}

const ReportsPage = () => {
    const [monthlySpendingMonth, setMonthlySpendingMonth] = useState<String | undefined>(undefined)
    const [incomeExpenseDateRange, setIncomeExpenseDateRange] = useState<DateRange | undefined>(undefined)

    const monthlySpendingQuery = useQuery({
        queryKey: ["monthly-spending", monthlySpendingMonth],
        queryFn: async () => {
            if (!monthlySpendingMonth) {
                return [];
            }

            const response = await axiosInstance("/reports/monthly-spending", {
                params: {
                    month: monthlySpendingMonth
                }
            });

            return response.data;
        },
        initialData: []
    })

    const incomeExpenseQuery = useQuery({
        queryKey: ["income-expense", formatDate(incomeExpenseDateRange?.from), formatDate(incomeExpenseDateRange?.to)],
        queryFn: async () => {
            if (!incomeExpenseDateRange?.to || !incomeExpenseDateRange?.from) {
                return [];
            }

            const response = await axiosInstance.get<IncomeExpense[]>("/reports/income-expense", {
                params: {
                    startDate: formatDate(incomeExpenseDateRange.from),
                    endDate: formatDate(incomeExpenseDateRange.to)
                }
            });
            return response.data
        },
        initialData: []
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full space-y-4"}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Monthly Spending Report
                    </CardTitle>
                </CardHeader>

                <MonthlySpendingReport
                    monthlySpendingMonth={monthlySpendingMonth}
                    setMonthlySpendingMonth={setMonthlySpendingMonth}
                    monthlySpendingData={monthlySpendingQuery.data}
                />
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Income - Expense Report
                    </CardTitle>
                </CardHeader>

                <IncomeExpenseReport
                    setIncomeExpenseDateRange={setIncomeExpenseDateRange}
                    incomeExpenseDateRange={incomeExpenseDateRange}
                    incomeExpenseData={incomeExpenseQuery.data}/>
            </Card>
        </main>
    );
};

export default ReportsPage;