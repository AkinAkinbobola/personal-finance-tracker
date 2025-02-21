import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx"
import AppSidebar from "@/components/shared/AppSidebar.tsx";
import {Outlet} from "react-router";
import {Toaster} from "@/components/ui/sonner.tsx";
import {ThemeProvider} from "@/components/shared/ThemeProvider.tsx";
import {ModeToggle} from "@/components/shared/ModeToggle.tsx";

const AppLayout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar/>

                <main className={"flex-1"}>

                    <div className={"m-2 flex justify-between items-center"}>
                        <SidebarTrigger/>
                        <h1 className={"font-bold text-xl"}>BudgetBuddy</h1>
                        <ModeToggle/>
                    </div>


                    <main className={"w-full h-full"}>
                        <Outlet/>
                    </main>
                </main>

                <Toaster/>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default AppLayout;