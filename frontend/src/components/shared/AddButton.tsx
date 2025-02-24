import {CirclePlus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface AddButtonProps {
    onClick: () => void
}

const AddButton = ({onClick}: AddButtonProps) => {
    return (
        <Button
            className={"fixed bottom-0 right-0 mx-2 my-2 md:my-6 sm:mx-6 lg:mx-8 size-14 rounded-full cursor-pointer"}
            onClick={onClick}>
            <CirclePlus/>
        </Button>
    );
};

export default AddButton;