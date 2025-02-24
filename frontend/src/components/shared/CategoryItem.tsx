import {Card, CardContent} from "@/components/ui/card.tsx";
import {capitalize} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import { Category } from "@/types/Category";

interface CategoryItemProps {
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
    return (
        <Card>
            <CardContent className={"flex items-center justify-between"}>
                <h1 className={"font-bold text-xl"}>{capitalize(category.name)}</h1>
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
    );
};

export default CategoryItem;