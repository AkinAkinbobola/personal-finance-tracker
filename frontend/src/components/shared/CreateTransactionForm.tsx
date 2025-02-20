import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import TransactionForm from "@/components/shared/TransactionForm.tsx";

const formSchema = z.object({
    amount: z.coerce.number().positive({message: 'Amount must be positive'}),
    description: z.string(),
    category: z.string().min(1, {message: 'Category is required'}),
    date: z.date(),
    type: z.string(),
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
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transactions"]})
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 1,
            description: '',
            category: '',
            date: new Date(),
            type: 'EXPENSE',
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