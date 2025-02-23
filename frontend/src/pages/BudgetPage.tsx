import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";

const BudgetPage = () => {
    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance<Category[]>('/categories')
            return response.data
        }
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8"}>
            {categories.isLoading && <p>Loading...</p>}
            {categories.isError && <p>Error</p>}
            {categories.isSuccess && (
                <ul>
                    {categories.data.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default BudgetPage;