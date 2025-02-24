import {Transaction} from "@/types/Transaction.ts";
import {format} from "date-fns";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import EditTransactionForm from "@/components/shared/EditTransactionForm.tsx";
import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface TransactionItemProps {
    transaction: Transaction
}

const TransactionItem = ({transaction}: TransactionItemProps) => {
    const [openEditTransactionDialog, setOpenEditTransactionDialog] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const queryClient = useQueryClient()

    const deleteTransactionMutation = useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/transactions/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transactions"]})
        }
    })

    return (
        <Card
            className={`${transaction.type === "INCOME"
                ? "bg-green-100 text-green-700 border border-green-600 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-700 border border-red-600 dark:bg-red-900 dark:text-red-300"}`
            }
        >
            <CardContent className={"flex justify-between items-center"}>
                <div className={`font-bold text-xl`}>
                    {transaction.type == "INCOME" ? "+" : "-"}
                    &#8358;
                    {transaction.amount}
                </div>

                <div>
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                </div>

                <div className={"space-x-2"}>
                    <Button size={"icon"} variant={"secondary"} className={"cursor-pointer"} onClick={() => {
                        setSelectedTransaction(transaction)
                        setOpenEditTransactionDialog(true)
                    }}>
                        <Pencil/>
                    </Button>

                    <Button size={"icon"} variant={"destructive"}
                            onClick={() => deleteTransactionMutation.mutate(transaction.id)}
                            className={"cursor-pointer"}>
                        <Trash2/>
                    </Button>
                </div>
            </CardContent>

            <Dialog open={openEditTransactionDialog} onOpenChange={setOpenEditTransactionDialog}>
                <DialogContent>
                    <DialogTitle>Edit Transaction</DialogTitle>
                        {
                            selectedTransaction &&
                            <EditTransactionForm
                                closeDialog={() => setOpenEditTransactionDialog(false)}
                                transaction={selectedTransaction}/>
                        }
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default TransactionItem;