import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import Loading from "@/components/shared/Loading.tsx";
import {Budget} from "@/types/Budget.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface BudgetDetailsParams {
    category: string
}

const BudgetDetails = () => {
    const params = useParams<Record<keyof BudgetDetailsParams, string>>();

    const budgets = useQuery({
        queryKey: ["budgets", params.category],
        queryFn: async () => {
            const response = await axiosInstance.get<Budget[]>(`/budgets/${params.category}`);
            return response.data;
        }
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full"}>
            {budgets.isLoading && <Loading/>}

            <div className={"space-y-4"}>
                {budgets.data && budgets.data.map(budget => (
                    <Card key={budget.id}>
                        <CardContent>
                            <div>{budget.title}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default BudgetDetails;