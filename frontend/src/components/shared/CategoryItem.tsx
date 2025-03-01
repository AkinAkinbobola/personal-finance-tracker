import {Card, CardContent} from "@/components/ui/card.tsx";
import {capitalize} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Category} from "@/types/Category";
import {NavLink} from "react-router";
import {useState} from "react";
import CreateBudgetDialog from "@/components/shared/CreateBudgetDialog.tsx";

interface CategoryItemProps {
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
    const [openAddBudget, setOpenAddBudget] = useState(false)

    return (
        <Card>
            <CardContent className={"flex items-center justify-between"}>
                <h1 className={"font-bold text-xl"}>{capitalize(category.name)}</h1>
                <div className={"flex items-center gap-2"}>
                    <Button asChild>
                        <NavLink to={`/app/budgets/${category.name}`}>
                            View Budgets
                        </NavLink>
                    </Button>
                    <Button onClick={() => setOpenAddBudget(true)}>
                        Add Budget
                    </Button>
                </div>

                <CreateBudgetDialog
                    category={category}
                    openAddBudget={openAddBudget}
                    setOpenAddBudget={setOpenAddBudget}/>
            </CardContent>
        </Card>
    );
};

export default CategoryItem;