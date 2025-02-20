import {Transaction} from "@/types/Transaction.ts";
import {format} from "date-fns";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog.tsx";
import EditTransactionForm from "@/components/shared/EditTransactionForm.tsx";
import {useState} from "react";

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
        <div
            className={`bg-card py-4 px-4 rounded-xl flex justify-between items-center ${transaction.type == "INCOME" ? "bg-green-300" : "bg-red-300"}`}>
            <div className={`font-bold text-xl`}>
                {transaction.type == "INCOME" ? "+" : "-"}
                {transaction.amount}
            </div>

            <div>
                {format(new Date(transaction.date), "MMM dd, yyyy")}
            </div>

            <div className={"space-x-2"}>
                <Button size={"icon"} variant={"outline"} className={"cursor-pointer"} onClick={() => {
                    setSelectedTransaction(transaction)
                    setOpenEditTransactionDialog(true)
                }}>
                    <Pencil/>
                </Button>

                <Button size={"icon"} variant={"destructive"}
                        onClick={() => deleteTransactionMutation.mutate(transaction.id)} className={"cursor-pointer"}>
                    <Trash2/>
                </Button>
            </div>

            <Dialog open={openEditTransactionDialog} onOpenChange={setOpenEditTransactionDialog}>
                <DialogContent>
                    <DialogHeader>
                        {
                            selectedTransaction &&
                            <EditTransactionForm
                                closeDialog={() => setOpenEditTransactionDialog(false)}
                                transaction={selectedTransaction}/>
                        }
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionItem;