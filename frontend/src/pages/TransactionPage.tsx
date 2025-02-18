import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Button} from "@/components/ui/button.tsx";

const TransactionPage = () => {
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

            <Button>Add transaction</Button>
        </div>
    );
};

export default TransactionPage;