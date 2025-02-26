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
import {BookText, ChevronUp, FolderOpen, HandCoins, Home} from "lucide-react";
import {NavLink} from "react-router";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";

const menuItems = [
    {
        title: "Dashboard",
        icon: Home,
        url: "/app/dashboard",
    },
    {
        title: "Categories",
        icon: FolderOpen,
        url: "/app/categories",
    },
    {
        title: "Transactions",
        icon: HandCoins,
        url: "/app/transactions",
    },
    {
        title: "Reports",
        icon: BookText,
        url: "/app/reports",
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Avatar className={"size-8"}>
                                        <AvatarFallback>AA</AvatarFallback>
                                    </Avatar>
                                    <div>Username</div>
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem asChild>
                                    <NavLink to={"/"}>
                                        Sign out
                                    </NavLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;