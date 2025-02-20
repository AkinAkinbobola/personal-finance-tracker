import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import MainLayout from "@/layouts/MainLayout.tsx";
import TransactionPage from "@/pages/TransactionPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import LandingPage from "@/pages/LandingPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import ServicesPage from "@/pages/ServicesPage.tsx";
import AppLayout from "@/layouts/AppLayout.tsx";

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
                    </Route>
                </Routes>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </StrictMode>
)
