import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import MainLayout from "@/layouts/MainLayout.tsx";
import TransactionPage from "@/pages/TransactionPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LandingPage from "@/pages/LandingPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import ServicesPage from "@/pages/ServicesPage.tsx";
import AppLayout from "@/layouts/AppLayout.tsx";
import DashboardPage from "@/pages/DashboardPage.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CategoriesPage from "@/pages/CategoriesPage.tsx";
import BudgetDetails from "@/pages/BudgetDetails.tsx";
import ReportsPage from "@/pages/ReportsPage.tsx";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<LandingPage/>}/>
                        <Route path={"about"} element={<AboutPage/>}/>
                        <Route path="services" element={<ServicesPage/>}/>
                    </Route>

                    <Route path={"/app"} element={<AppLayout/>}>
                        <Route path={"transactions"} element={<TransactionPage/>}/>
                        <Route path={"dashboard"} element={<DashboardPage/>}/>
                        <Route path={"budgets"}>
                            <Route path={":category"} element={<BudgetDetails/>}/>
                        </Route>
                        <Route path={"categories"} element={<CategoriesPage/>}/>
                        <Route path={"reports"} element={<ReportsPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </StrictMode>
)
