import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import Loading from "@/components/shared/Loading.tsx";
import {Budget} from "@/types/Budget.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import NoData from "@/components/shared/NoData.tsx";
import AddButton from "@/components/shared/AddButton.tsx";
import {useState} from "react";
import CreateBudgetDialog from "@/components/shared/CreateBudgetDialog.tsx";
import {Category} from "@/types/Category.ts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Progress} from "@/components/ui/progress.tsx";
import {formatMoney} from "@/lib/utils.ts";


interface BudgetDetailsParams {
    category: string
}

const BudgetDetails = () => {
    const [openCreateBudgetDialog, setOpenCreateBudgetDialog] = useState(false)

    const params = useParams<Record<keyof BudgetDetailsParams, string>>();

    const budgets = useQuery({
        queryKey: ["budgets", params.category],
        queryFn: async () => {
            const response = await axiosInstance.get<Budget[]>(`/budgets/${params.category}`);
            return response.data;
        }
    })

    const category = useQuery({
        queryKey: ["category", params.category],
        queryFn: async () => {
            const response = await axiosInstance.get<Category>(`/categories/${params.category}`);
            return response.data;
        }
    });

    if (budgets.isLoading) {
        return <Loading/>
    }

    if (budgets.isError) {
        throw new Error("Error fetching budgets")
    }

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full relative"}>
            {
                budgets.data && budgets.data.length === 0 && (
                    <NoData>
                        <h1 className={"font-bold text-xl"}>No budgets yet</h1>
                        <p className={"font-medium text-muted-foreground"}>Create your first budget</p>
                    </NoData>
                )
            }

            <div className={"space-y-4"}>
                {budgets.data && budgets.data.length > 0 && budgets.data.map(budget => (
                    <Card key={budget.id}>
                        <CardContent>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={budget.title}>
                                    <AccordionTrigger className={"hover:no-underline"}>
                                        <div className={"flex justify-between items-center w-full"}>
                                            <h1>{budget.title}</h1>

                                            <p>{formatMoney(budget.totalAmount)}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Progress max={budget.totalAmount} value={budget.spentAmount} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AddButton onClick={() => setOpenCreateBudgetDialog(true)}/>

            {
                category.data && <CreateBudgetDialog
                    category={category.data}
                    openAddBudget={openCreateBudgetDialog}
                    setOpenAddBudget={setOpenCreateBudgetDialog}/>
            }
        </main>
    );
};

export default BudgetDetails;