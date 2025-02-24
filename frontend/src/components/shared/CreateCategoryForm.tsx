import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {toast} from "sonner";
import {Category} from "@/types/Category.ts";

const formSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }).min(1, {message: 'Name is required'}),
})

type FormValues = z.infer<typeof formSchema>

interface CreateCategoryFormProps {
    closeDialog: () => void
}

const CreateCategoryForm = ({closeDialog}: CreateCategoryFormProps) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            await axiosInstance.post<Category>("/categories", values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]})
            toast.success("Category added successfully")
            closeDialog()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                <FormField
                    control={form.control}
                    name={"name"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder={"Category Name"} className={"mt-2"}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className={"flex justify-end"}>
                    <Button type={"submit"}>Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateCategoryForm;