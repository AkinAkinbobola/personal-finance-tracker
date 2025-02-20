import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import {HandCoins, Home} from "lucide-react";
import {NavLink} from "react-router";

const menuItems = [
    {
        title: "Dashboard",
        icon: Home,
        url: "/app/dashboard",
    },
    {
        title: "Transactions",
        icon: HandCoins,
        url: "/app/transactions",
    }
]

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <img src="/logo.png" alt="Logo" className={"w-fit p-6"}/>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            menuItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </NavLink>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton asChild>
                    <NavLink to={"/"}>
                        Logout
                    </NavLink>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;