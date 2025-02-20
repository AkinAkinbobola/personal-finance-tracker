import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx"
import AppSidebar from "@/components/shared/AppSidebar.tsx";
import {Outlet} from "react-router";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>

            <main>
                <SidebarTrigger/>
                <Outlet/>
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;