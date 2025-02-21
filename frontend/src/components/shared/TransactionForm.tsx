import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {capitalize, cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon, Plus} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {UseFormReturn} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";
import {useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";

interface TransactionFormProps {
    form: UseFormReturn<any>,
    onSubmit: (values: any) => void
}

const TransactionForm = ({form, onSubmit}: TransactionFormProps) => {
    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance.get<Category[]>("/categories")
            return response.data
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                <FormField
                    control={form.control}
                    name={"amount"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"font-bold"}>Amount</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span
                                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">&#8358;</span>
                                    <Input
                                        placeholder="Amount"
                                        {...field}
                                        className="mt-2 pl-8"
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
                    name={"description"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Description"} {...field} className={"mt-2"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={"flex space-x-4"}>
                    {
                        categories.data &&

                        <FormField
                            control={form.control}
                            name="category"
                            render={({field}) => {
                                const [newCategory, setNewCategory] = useState("");
                                const [categoryList, setCategoryList] = useState(categories.data || []);

                                const handleAddCategory = () => {
                                    if (newCategory.trim() && !categoryList.some(c => c.name === newCategory)) {
                                        const newCat = {id: Date.now(), name: newCategory};
                                        setCategoryList([...categoryList, newCat]);
                                        field.onChange(newCategory);
                                        setNewCategory("");
                                    }
                                };

                                return (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue placeholder="Select a category"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categoryList.map((category) => (
                                                        <SelectItem key={category.id} value={category.name}>
                                                            {capitalize(category.name)}
                                                        </SelectItem>
                                                    ))}
                                                    <Separator className={"my-2"}/>
                                                    <div className={"flex gap-2 px-2 pb-2"}>
                                                        <Input
                                                            type="text"
                                                            placeholder="Add category"
                                                            value={newCategory}
                                                            onChange={(e) => setNewCategory(e.target.value)}
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={handleAddCategory}
                                                            size={"icon"}
                                                            className={"cursor-pointer"}
                                                        >
                                                            <Plus/>
                                                        </Button>
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />
                    }
                    <FormField
                        control={form.control}
                        name={"type"}
                        render={({field}) => (
                            <FormItem className={"w-1/2"}>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className={"mt-2"}>
                                            <SelectValue placeholder="Select a type"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="INCOME">Income</SelectItem>
                                            <SelectItem value="EXPENSE">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name={"date"}
                    render={({field}) => (
                        <FormItem className={"flex flex-col gap-2 w-full"}>
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild className={"w-full"}>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {format(field.value, "PPP")}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
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


                <div className={"flex justify-end"}>
                    <Button type={"submit"} size={"lg"} className={"rounded-3xl cursor-pointer"}>Submit</Button>
                </div>
            </form>
        </Form>);

};

export default TransactionForm;