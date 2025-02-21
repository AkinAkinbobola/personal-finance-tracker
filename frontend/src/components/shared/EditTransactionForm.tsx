import {Transaction} from "@/types/Transaction.ts";
import {z} from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TransactionForm from "@/components/shared/TransactionForm.tsx";
import {toast} from "sonner";

interface EditTransactionFormProps {
    closeDialog: () => void
    transaction: Transaction
}

const formSchema = z.object({
    amount: z.coerce.number().positive({message: 'Amount must be positive'}),
    description: z.string(),
    category: z.string().min(1, {message: 'Category is required'}),
    date: z.date(),
    type: z.string().min(1, {message: 'Type is required'}),
})

type FormValues = z.infer<typeof formSchema>

const EditTransactionForm = ({transaction, closeDialog}: EditTransactionFormProps) => {
    const queryClient = useQueryClient()

    const editTransactionMutation = useMutation({
        mutationFn: async (values: FormValues) => {
            await axiosInstance.put(`/transactions/${transaction.id}`, values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transactions"]})
            toast.success('Transaction edited successfully')
        },
        onError: error => {
            toast.error(error.message)
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category,
            date: new Date(transaction.date),
            type: transaction.type,
        }
    })

    const onSubmit = (values: FormValues) => {
        editTransactionMutation.mutate(values)
        closeDialog()
    }

    return (
        <TransactionForm form={form} onSubmit={onSubmit}/>
    );
};

export default EditTransactionForm;