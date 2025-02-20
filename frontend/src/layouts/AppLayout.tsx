import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx"
import AppSidebar from "@/components/shared/AppSidebar.tsx";
import {Outlet} from "react-router";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>

            <main className={"flex-1"}>

                <SidebarTrigger className={"m-2"}/>


                <main className={"w-full h-full"}>
                    <Outlet/>
                </main>
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;