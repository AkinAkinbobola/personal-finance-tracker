import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl min-h-screen flex flex-col">
            <Outlet/>
        </div>
    );
};

export default Layout;