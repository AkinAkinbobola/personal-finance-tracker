import {Transaction} from "@/types/Transaction.ts";
import {z} from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axiosInstance.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
                <FormField
                    control={form.control}
                    name={"amount"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder={"Amount"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"description"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder={"Description"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"category"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder={"Category"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"date"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {format(field.value, "PPP")}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"type"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input placeholder={"Type"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type={"submit"}>Submit</Button>
            </form>
        </Form>);
};

export default EditTransactionForm;