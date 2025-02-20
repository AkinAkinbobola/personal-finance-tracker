import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx"
import AppSidebar from "@/components/shared/AppSidebar.tsx";
import {Outlet} from "react-router";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>

            <main className={"w-full"}>
                <SidebarTrigger/>
                <div className={"container mx-auto px-2 py-2 md:py-6 sm:px-6 lg:px-8"}>
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;