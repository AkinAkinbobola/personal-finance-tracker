import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Dialog, DialogContent,} from "@/components/ui/dialog"
import {useState} from "react";
import CreateTransactionForm from "@/components/shared/CreateTransactionForm.tsx";
import {CirclePlus} from "lucide-react";
import TransactionItem from "@/components/shared/TransactionItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import Loading from "@/components/shared/Loading.tsx";

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

            <Button
                className={"fixed bottom-0 right-0 mx-2 my-2 md:my-6 sm:mx-6 lg:mx-8 size-14 rounded-full cursor-pointer"}
                onClick={() => setOpenAddTransactionDialog(true)}>
                <CirclePlus/>
            </Button>

            <Dialog open={openAddTransactionDialog} onOpenChange={setOpenAddTransactionDialog}>
                <DialogContent>
                    <CreateTransactionForm closeDialog={() => setOpenAddTransactionDialog(false)}/>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default TransactionPage;