import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogHeader,} from "@/components/ui/dialog"
import {useState} from "react";
import CreateTransactionForm from "@/components/CreateTransactionForm.tsx";
import EditTransactionForm from "@/components/EditTransactionForm.tsx";

const TransactionPage = () => {
    const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false)
    const [openEditTransactionDialog, setOpenEditTransactionDialog] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const queryClient = useQueryClient()

    const transactions = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axiosInstance<Transaction[]>('/transactions')
            return response.data
        }
    })

    const deleteTransactionMutation = useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/transactions/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transactions"]})
        }
    })


    return (
        <div>
            <h1>Transactions</h1>
            {transactions.isLoading && <p>Loading...</p>}
            {transactions.isError && <p>Error</p>}
            {transactions.isSuccess && (
                <ul>
                    {transactions.data.map((transaction: Transaction) => (
                        <li key={transaction.id}>
                            {transaction.description} - {transaction.amount}
                            <Button onClick={() => deleteTransactionMutation.mutate(transaction.id)}>Delete</Button>
                            <Button onClick={() => {
                                setSelectedTransaction(transaction)
                                setOpenEditTransactionDialog(true)
                            }}>Edit</Button>
                        </li>
                    ))}
                </ul>
            )}

            <Button onClick={() => setOpenAddTransactionDialog(true)}>Add transaction</Button>

            <Dialog open={openAddTransactionDialog} onOpenChange={setOpenAddTransactionDialog}>
                <DialogContent>
                    <DialogHeader>
                        <CreateTransactionForm closeDialog={() => setOpenAddTransactionDialog(false)}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog open={openEditTransactionDialog} onOpenChange={setOpenEditTransactionDialog}>
                <DialogContent>
                    <DialogHeader>
                        {
                            selectedTransaction &&
                            <EditTransactionForm closeDialog={() => setOpenEditTransactionDialog(false)}
                                                 transaction={selectedTransaction}/>
                        }
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionPage;