import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import MainLayout from "@/components/MainLayout.tsx";
import TransactionPage from "@/pages/TransactionPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import LandingPage from "@/pages/LandingPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>
                    </Route>

                    <Route path="/transactions" element={<TransactionPage/>}/>
                </Routes>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </StrictMode>
)
