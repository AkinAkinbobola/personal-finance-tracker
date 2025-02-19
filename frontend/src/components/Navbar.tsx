import {Link, NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";

const Navbar = () => {
    const hover = "hover:text-blue-700/60";

    return (
        <header className={"flex items-center justify-between"}>
            <img src="/logo.png" alt="Logo" className={"w-[162px] h-[42px]"}/>

            <nav className={"flex items-center justify-between gap-x-10 text-blue-700 font-medium "}>
                <NavLink to={"/"} className={hover}>
                    Product
                </NavLink>

                <NavLink to={"/"} className={hover}>
                    Services
                </NavLink>

                <NavLink to={"/"} className={hover}>
                    About
                </NavLink>

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