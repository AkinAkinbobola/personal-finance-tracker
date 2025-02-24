import {Loader2} from "lucide-react";

const Loading = () => {
    return (
        <div
            className={"w-full flex items-center justify-center h-full"}>
            <Loader2 className={"animate-spin"}/>
        </div>
    );
};

export default Loading;