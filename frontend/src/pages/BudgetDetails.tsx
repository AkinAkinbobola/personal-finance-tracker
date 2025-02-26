import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import Loading from "@/components/shared/Loading.tsx";
import {Budget} from "@/types/Budget.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import NoData from "@/components/shared/NoData.tsx";
import AddButton from "@/components/shared/AddButton.tsx";
import {useEffect, useState} from "react";
import CreateBudgetDialog from "@/components/shared/CreateBudgetDialog.tsx";
import {Category} from "@/types/Category.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {Progress} from "@/components/ui/progress.tsx";
import {formatMoney} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent} from "@/components/ui/dialog.tsx";
import TransactionItem from "@/components/shared/TransactionItem.tsx";
import CreateTransactionDialog from "@/components/shared/CreateTransactionDialog.tsx";
import {DialogTitle} from "@radix-ui/react-dialog";


interface BudgetDetailsParams {
    category: string
}

const BudgetDetails = () => {
    const [openCreateBudgetDialog, setOpenCreateBudgetDialog] = useState(false)
    const [openBudgetTransactionsDialog, setOpenBudgetTransactionsDialog] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
    const [openCreateTransactionForm, setOpenCreateTransactionForm] = useState(false)

    const params = useParams<Record<keyof BudgetDetailsParams, string>>();

    const budgets = useQuery({
        queryKey: ["budgets", params.category],
        queryFn: async () => {
            const response = await axiosInstance.get<Budget[]>(`/budgets/${params.category}`);
            return response.data;
        }
    })

    useEffect(() => {
        if (selectedBudget && budgets.data) {
            const updatedBudget = budgets.data.find(b => b.id === selectedBudget.id);
            setSelectedBudget(updatedBudget || null);
        }
    }, [budgets.data]);

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
                                        <div className={"flex justify-between items-center w-full text-xl"}>
                                            <h1>{budget.title}</h1>

                                            <p>{formatMoney(budget.totalAmount)}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className={"flex flex-col gap-4"}>
                                        <Progress value={budget.spentAmount} max={budget.totalAmount}/>

                                        <div className={"flex justify-between font-bold"}>
                                            <p>Amount spent: {formatMoney(budget.spentAmount)}</p>
                                            <p>Budget amount: {formatMoney(budget.totalAmount)}</p>
                                        </div>

                                        <Button onClick={() => {
                                            setSelectedBudget(budget)
                                            setOpenBudgetTransactionsDialog(true)
                                        }}>
                                            View transactions
                                        </Button>
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

            {
                selectedBudget &&
                <Dialog open={openBudgetTransactionsDialog} onOpenChange={setOpenBudgetTransactionsDialog}>
                    <DialogContent className={"overflow-y-auto"}>
                        <DialogTitle>
                            Transactions for {selectedBudget.title}
                        </DialogTitle>

                        {
                            selectedBudget.transactions.map(transaction => (
                                    <TransactionItem transaction={transaction} key={transaction.id}/>
                                )
                            )
                        }

                        <Button onClick={() => setOpenCreateTransactionForm(true)}>
                            Add transaction
                        </Button>
                    </DialogContent>
                </Dialog>
            }

            <CreateTransactionDialog
                openAddTransactionDialog={openCreateTransactionForm}
                setOpenAddTransactionDialog={setOpenCreateTransactionForm}/>
        </main>
    );
};

export default BudgetDetails;