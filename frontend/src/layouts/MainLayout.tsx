import {Outlet} from "react-router";
import Navbar from "@/components/shared/Navbar.tsx";
import Footer from "@/components/shared/Footer.tsx";

const MainLayout = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col pt-6  md:pt-4">
            <div className={"flex flex-col min-h-screen"}>
                <Navbar/>

                <div className={"flex-1 w-full"}>
                    <Outlet/>
                </div>

                <Footer/>
            </div>
        </div>
    );
};

export default MainLayout;