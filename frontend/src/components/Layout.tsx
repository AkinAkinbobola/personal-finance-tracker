import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col pt-6  md:pt-[56px]">
            <Outlet/>
        </div>
    );
};

export default Layout;