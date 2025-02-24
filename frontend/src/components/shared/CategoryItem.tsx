import {Card, CardContent} from "@/components/ui/card.tsx";
import {capitalize} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Category} from "@/types/Category";
import {NavLink} from "react-router";
import {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import AddBudgetForm from "@/components/shared/AddBudgetForm.tsx";

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

                <Dialog open={openAddBudget} onOpenChange={setOpenAddBudget}>
                    <DialogContent>
                        <DialogTitle>Create Budget</DialogTitle>

                        <AddBudgetForm category={category} closeDialog={() => setOpenAddBudget(false)}/>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default CategoryItem;