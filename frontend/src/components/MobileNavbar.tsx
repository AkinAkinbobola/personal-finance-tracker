import {Sheet, SheetContent, SheetHeader} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Briefcase, Globe, Home, Menu} from "lucide-react";
import {NavLink} from "react-router";
import {useState} from "react";

const MobileNavbar = () => {
    const linkStyle = `flex items-center gap-3 py-3 px-6 bg-blue-700 w-full text-white rounded-2xl`;
    const [openSheet, setOpenSheet] = useState(false)

    return (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <Button size={"icon"} variant={"ghost"} className={"md:hidden"} onClick={() => setOpenSheet(true)}>
                    <Menu/>
                </Button>
            <SheetContent side={"left"} className={"md:hidden"}>
                <SheetHeader>
                    <div className={"py-6"}>
                        <img src="/logo.png" alt="Logo" className={"w-fit"}/>
                    </div>
                </SheetHeader>

                <div className={"gap-y-2 flex flex-col"}>
                    <NavLink to={"/"}
                             className={({isActive}) => `${linkStyle} ${isActive && "bg-primary"}`}
                                onClick={() => setOpenSheet(false)}
                    >
                        <Home/>

                        <div>
                            Home
                        </div>
                    </NavLink>

                    <NavLink to={"/services"}
                             className={({isActive}) => `${linkStyle} ${isActive && "bg-primary"}`}
                             onClick={() => setOpenSheet(false)}
                    >
                        <Briefcase/>

                        <div>
                            Services
                        </div>
                    </NavLink>

                    <NavLink to={"/about"}
                             className={({isActive}) => `${linkStyle} ${isActive && "bg-primary"}`}
                             onClick={() => setOpenSheet(false)}
                    >
                        <Globe/>

                        <div>
                            About
                        </div>
                    </NavLink>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavbar;