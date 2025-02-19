import {NavLink} from "react-router";
import {Separator} from "@/components/ui/separator.tsx";
import {Mail, MessageCircle} from "lucide-react";

const Footer = () => {
    const hover = "hover:text-blue-700/60";

    return (
        <div className={"flex flex-col gap-7 py-8"}>
            <div className={"flex justify-between items-center text-blue-700"}>
                <img src="/logo.png" alt="Logo" className={"w-[150px] h-[42px]"}/>

                <div className={"flex gap-8"}>
                    <NavLink to={"/"} className={hover}>
                        Product
                    </NavLink>

                    <NavLink to={"/"} className={hover}>
                        Services
                    </NavLink>

                    <NavLink to={"/"} className={hover}>
                        About
                    </NavLink>
                </div>
            </div>

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