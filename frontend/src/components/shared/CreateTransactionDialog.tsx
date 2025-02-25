import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import CreateTransactionForm from "@/components/shared/CreateTransactionForm.tsx";

interface CreateTransactionDialogProps {
    openAddTransactionDialog: boolean;
    setOpenAddTransactionDialog: (open: boolean) => void;
}

const CreateTransactionDialog = ({
                                     openAddTransactionDialog,
                                     setOpenAddTransactionDialog
                                 }: CreateTransactionDialogProps) => {
    return (
        <Dialog open={openAddTransactionDialog} onOpenChange={setOpenAddTransactionDialog}>
            <DialogContent>
                <DialogTitle>Create Transaction</DialogTitle>
                <CreateTransactionForm closeDialog={() => setOpenAddTransactionDialog(false)}/>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTransactionDialog;