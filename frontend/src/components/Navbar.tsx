import {Link, NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTrigger,} from "@/components/ui/sheet"
import {Menu} from "lucide-react";

const Navbar = () => {
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
                    <NavLink to={"/"} className={({isActive}) => `link-hover ${isActive ? "text-primary" : ""}`}>
                        Home
                    </NavLink>

                    <NavLink to={"/services"} className={({isActive}) => `link-hover ${isActive ? "text-primary" : ""}`}>
                        Services
                    </NavLink>

                    <NavLink to={"/about"} className={({isActive}) => `link-hover ${isActive ? "text-primary" : ""}`}>
                        About
                    </NavLink>
                </div>

                <Button className={"rounded-full px-10 py-2 font-bold"} asChild>
                    <Link to={"/transactions"}>
                        Login
                    </Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;