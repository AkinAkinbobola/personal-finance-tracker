import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {useState} from "react";
import MonthlySpendingReport from "@/components/shared/MonthlySpendingReport.tsx";

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
        }
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full space-y-4"}>
            {
                monthlySpendingQuery.data &&

                <MonthlySpendingReport
                    setMonthlySpendingMonth={setMonthlySpendingMonth}
                    monthlySpendingData={monthlySpendingQuery.data}
                />
            }
        </main>
    );
};

export default ReportsPage;