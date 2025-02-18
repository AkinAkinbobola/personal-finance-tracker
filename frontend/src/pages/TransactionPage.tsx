import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axiosInstance.ts";

const TransactionPage = () => {
    const transactions = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axiosInstance('/transactions')
            return response.data
        }
    })

    return (
        <div>
            <h1>Transactions</h1>
            {transactions.isLoading && <p>Loading...</p>}
            {transactions.isError && <p>Error</p>}
            {transactions.isSuccess && (
                <ul>
                    {transactions.data.map((transaction: any) => (
                        <li key={transaction.id}>
                            {transaction.description} - {transaction.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionPage;