import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import TransactionForm from "@/components/shared/TransactionForm.tsx";
import {toast} from "sonner";

const formSchema = z.object({
    amount: z.coerce.number({
        required_error: "Total amount is required",
        invalid_type_error: "Total amount must be a number"
    }).positive({message: 'Amount must be positive'}),
    description: z.string(),
    category: z.string({
        required_error: 'Category is required',
    }).min(1, {message: 'Category is required'}),
    date: z.date({
        required_error: 'Date is required'
    }),
    type: z.string({
        required_error: 'Type is required'
    }).min(1, {message: 'Type is required'}),
})

type FormValues = z.infer<typeof formSchema>

interface TransactionFormProps {
    closeDialog: () => void
}

const CreateTransactionForm = ({closeDialog}: TransactionFormProps) => {
    const queryClient = useQueryClient()

    const addTransactionMutation = useMutation({
        mutationFn: async (values: FormValues) => {
            await axiosInstance.post('/transactions', values)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey: ["transactions"]})
            queryClient.invalidateQueries({queryKey: ["budgets", variables.category]})
            toast.success(`Transaction added successfully`)
        },
        onError: error => {
            toast.error(error.message)
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 1,
            description: '',
            category: '',
            date: new Date(),
            type: '',
        },
    })

    const onSubmit = (values: FormValues) => {
        addTransactionMutation.mutate(values)
        closeDialog()
    }

    return (
        <TransactionForm form={form} onSubmit={onSubmit}/>
    );
};

export default CreateTransactionForm;