import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Dialog, DialogContent, DialogTitle,} from "@/components/ui/dialog"
import {useState} from "react";
import CreateTransactionForm from "@/components/shared/CreateTransactionForm.tsx";
import TransactionItem from "@/components/shared/TransactionItem.tsx";
import Loading from "@/components/shared/Loading.tsx";
import AddButton from "@/components/shared/AddButton.tsx";

const TransactionPage = () => {
    const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false)


    const transactions = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axiosInstance<Transaction[]>('/transactions')
            return response.data
        }
    })


    return (
        <main className={"h-full relative px-2 py-2 md:py-4 sm:px-6 lg:px-8"}>
            {transactions.isLoading &&
                <Loading/>
            }

            {transactions.isError && <p>Error</p>}

            {transactions.isSuccess && (
                <ul className={"space-y-4"}>
                    {transactions.data.map((transaction: Transaction) => (
                        <TransactionItem transaction={transaction} key={transaction.id}/>
                    ))}
                </ul>
            )}

            <AddButton onClick={() => setOpenAddTransactionDialog(true)}/>

            <Dialog open={openAddTransactionDialog} onOpenChange={setOpenAddTransactionDialog}>
                <DialogContent>
                    <DialogTitle>Create Transaction</DialogTitle>
                    <CreateTransactionForm closeDialog={() => setOpenAddTransactionDialog(false)}/>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default TransactionPage;