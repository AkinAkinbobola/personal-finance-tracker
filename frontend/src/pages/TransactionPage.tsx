import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogHeader,} from "@/components/ui/dialog"
import {useState} from "react";
import TransactionForm from "@/components/TransactionForm.tsx";

const TransactionPage = () => {
    const [openDialog, setOpenDialog] = useState(false)
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
                        </li>
                    ))}
                </ul>
            )}

            <Button onClick={() => setOpenDialog(true)}>Add transaction</Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <TransactionForm closeDialog={() => setOpenDialog(false)}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionPage;