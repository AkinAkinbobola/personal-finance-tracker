import {Link, NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTrigger,} from "@/components/ui/sheet"
import {Menu} from "lucide-react";

const Navbar = () => {
    const hover = "hover:text-blue-700/60";

    return (
        <header className={"flex items-center justify-between"}>
            <img src="/logo.png" alt="Logo" className={"w-[162px] h-[42px] hidden md:block"}/>

            <Sheet>
                <SheetTrigger>
                    <Button size={"icon"} variant={"ghost"} className={"md:hidden"}>
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <div className={"py-6"}>
                            <img src="/logo.png" alt="Logo" className={"w-fit"}/>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <nav className={"flex items-center justify-between gap-x-10"}>
                <div className={"items-center justify-between gap-x-10 hidden md:flex text-blue-700 font-medium "}>
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

                <Button className={"rounded-full px-10 py-2"} asChild>
                    <Link to={"/transactions"}>
                        Login
                    </Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;