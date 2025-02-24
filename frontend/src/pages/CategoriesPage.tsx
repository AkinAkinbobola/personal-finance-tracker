import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";
import CategoryItem from "@/components/shared/CategoryItem.tsx";
import Loading from "@/components/shared/Loading.tsx";

const CategoriesPage = () => {
    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance<Category[]>('/categories')
            return response.data
        }
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full"}>
            {categories.isLoading && <Loading/>}
            {categories.isError && <p>Error</p>}
            {categories.isSuccess && (
                <ul className={"flex flex-col gap-4"}>
                    {categories.data.map((category) => (
                        <CategoryItem category={category} key={category.id}/>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default CategoriesPage;