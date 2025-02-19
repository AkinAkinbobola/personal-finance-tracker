import {Separator} from "@/components/ui/separator.tsx";
import {Mail, MessageCircle} from "lucide-react";

const Footer = () => {
    return (
        <div className={"flex flex-col gap-7 py-8"}>
            <Separator/>

            <div className={"flex justify-between"}>
                <div className={"flex gap-2 items-center"}>
                    <MessageCircle/>
                    <div>
                        Let's Chat
                    </div>
                </div>

                <div className={"flex gap-2 items-center"}>
                    <Mail/>
                    <div>
                        akinbobola71@gmail.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;