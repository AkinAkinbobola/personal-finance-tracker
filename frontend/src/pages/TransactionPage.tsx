import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Transaction} from "@/types/Transaction.ts";
import {Dialog, DialogContent, DialogHeader,} from "@/components/ui/dialog"
import {useState} from "react";
import CreateTransactionForm from "@/components/shared/CreateTransactionForm.tsx";
import {Loader2} from "lucide-react";
import TransactionItem from "@/components/TransactionItem.tsx";

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
        <main>
            {transactions.isLoading &&
                <div
                    className={"w-full flex items-center justify-center min-h-screen h-full"}>
                    <Loader2 className={"animate-spin"}/>
                </div>
            }

            {transactions.isError && <p>Error</p>}

            {transactions.isSuccess && (
                <ul className={"space-y-4"}>
                    {transactions.data.map((transaction: Transaction) => (
                        <TransactionItem transaction={transaction} key={transaction.id}/>
                    ))}
                </ul>
            )}

            {/*<Button onClick={() => setOpenAddTransactionDialog(true)}>Add transaction</Button>*/}

            <Dialog open={openAddTransactionDialog} onOpenChange={setOpenAddTransactionDialog}>
                <DialogContent>
                    <DialogHeader>
                        <CreateTransactionForm closeDialog={() => setOpenAddTransactionDialog(false)}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default TransactionPage;