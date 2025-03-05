import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {useState} from "react";
import MonthlySpendingReport from "@/components/shared/MonthlySpendingReport.tsx";
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const ReportsPage = () => {
    const [monthlySpendingMonth, setMonthlySpendingMonth] = useState<String | undefined>(undefined)

    const monthlySpendingQuery = useQuery({
        queryKey: ["monthlySpending", monthlySpendingMonth],
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
        </main>
    );
};

export default ReportsPage;