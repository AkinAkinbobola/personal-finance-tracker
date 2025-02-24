import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {Category} from "@/types/Category.ts";
import CategoryItem from "@/components/shared/CategoryItem.tsx";
import Loading from "@/components/shared/Loading.tsx";
import {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import AddButton from "@/components/shared/AddButton.tsx";
import CreateCategoryForm from "@/components/shared/CreateCategoryForm.tsx";

const CategoriesPage = () => {
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false)

    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axiosInstance<Category[]>('/categories')
            return response.data
        }
    })

    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full relative"}>
            {categories.isLoading && <Loading/>}
            {categories.isError && <p>Error</p>}
            {categories.isSuccess && (
                <ul className={"flex flex-col gap-4"}>
                    {categories.data.map((category) => (
                        <CategoryItem category={category} key={category.id}/>
                    ))}
                </ul>
            )}

            <AddButton onClick={() => setOpenAddCategoryDialog(true)}/>

            <Dialog open={openAddCategoryDialog} onOpenChange={setOpenAddCategoryDialog}>
                <DialogContent>
                    <DialogTitle>Create Category</DialogTitle>
                    <CreateCategoryForm closeDialog={() => setOpenAddCategoryDialog(false)}/>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default CategoriesPage;