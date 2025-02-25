import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import CreateBudgetForm from "@/components/shared/CreateBudgetForm.tsx";
import {Category} from "@/types/Category";

interface CreateBudgetDialogProps {
    category: Category
    openAddBudget: boolean
    setOpenAddBudget: (open: boolean) => void
}

const CreateBudgetDialog = ({category, openAddBudget, setOpenAddBudget}: CreateBudgetDialogProps) => {
    return (
        <Dialog open={openAddBudget} onOpenChange={setOpenAddBudget}>
            <DialogContent>
                <DialogTitle>Create Budget</DialogTitle>

                <CreateBudgetForm category={category} closeDialog={() => setOpenAddBudget(false)}/>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBudgetDialog;