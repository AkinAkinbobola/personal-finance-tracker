import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";
import {Card, CardContent,} from "@/components/ui/card"
import {capitalize} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

const CategoriesPage = () => {
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
                        <Card key={category.id}>
                            <CardContent className={"flex items-center justify-between"}>
                                <div>{capitalize(category.name)}</div>
                                <div className={"flex items-center gap-2"}>
                                    <Button>
                                        View Budgets
                                    </Button>
                                    <Button>
                                        Add Budget
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default CategoriesPage;