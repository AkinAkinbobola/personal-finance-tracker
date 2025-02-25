import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {format} from "date-fns";
import {Category} from "@/types/Category.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {toast} from "sonner";

const formSchema = z.object({
    totalAmount: z.coerce.number({
        required_error: "Total amount is required",
        invalid_type_error: "Total amount must be a number"
    }).positive({message: 'Total amount must be positive'}),
    month: z.string(),
})

type FormValues = z.infer<typeof formSchema>

const convertDate = (date: number) => {
    return format(date, "yyyy-MM")
}

const months = Array.from({length: 12}, (_, i) => ({
    name: format(new Date().setMonth(i), "MMMM"),
    year: convertDate(new Date().setMonth(i))
}))

interface AddBudgetFormProps {
    category: Category,
    closeDialog: () => void
}

const CreateBudgetForm = ({category, closeDialog}: AddBudgetFormProps) => {
        const form = useForm<FormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                totalAmount: 1,
                month: "",
            }
        })

        const queryClient = useQueryClient()

        const mutation = useMutation({
            mutationFn: async (values: FormValues) => {
                await axiosInstance.post("/budgets", {...values, categoryId: category.id})
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["budgets", category.name]})
                toast.success("Budget added successfully")
            },
            onError: error => {
                toast.error(error.message)
            }
        })
        const onSubmit = (values: FormValues) => {
            mutation.mutate(values)
            closeDialog()
        }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                    <FormField
                        control={form.control}
                        name={"totalAmount"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Total Amount</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                    <span
                                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">&#8358;</span>
                                        <Input
                                            placeholder="Total Amount"
                                            {...field}
                                            className="pl-8 mt-2"
                                            type={"number"}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"month"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Month</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className={"mt-2"}>
                                            <SelectValue placeholder={"Select Month"}/>
                                        </SelectTrigger>

                                        <SelectContent className={"w-1/2 h-64 overflow-y-auto"}>
                                            {
                                                months.map(month => (
                                                    <SelectItem value={month.year} key={month.name}>
                                                        {format(month.year, "MMMM")}
                                                    </SelectItem>
                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"flex justify-end"}>
                        <Button type={"submit"}>Submit</Button>
                    </div>
                </form>
            </Form>
        );
    }
;

export default CreateBudgetForm;