import Navbar from "@/components/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import Footer from "@/components/Footer.tsx";

const LandingPage = () => {
    return (
        <>
            <div className={"flex flex-col min-h-screen "}>
                <Navbar/>

                <div className={"w-9/10 mx-auto flex-1 flex items-center justify-center"}>
                    <div className={"flex py-10 items-center justify-center w-full gap-x-[106px]"}>
                        <div className={"flex flex-col gap-y-6"}>
                            <div className={"text-primary font-medium text-sm"}>
                                LET'S MANAGE YOUR FINANCES
                            </div>

                            <div className={"font-bold text-5xl"}>
                                Take control of your money with BudgetBuddy.
                            </div>

                            <div className={"text-xs text-muted-foreground"}>
                                With powerful budgeting tools and real-time tracking, you can monitor your income,
                                expenses,
                                and
                                savings effortlessly. Set goals, generate reports, and achieve financial stability with
                                ease.
                            </div>

                            <Button className={"w-fit"} size={"lg"} asChild>
                                <Link to={"/transactions"}>
                                    Get Started
                                </Link>
                            </Button>
                        </div>

                        <div className={"min-w-[463px] min-h-[463px] rounded-full overflow-hidden"}>
                            <img src="/hero.jpg" alt="Hero" className={"object-cover rounded-full size-[463px]"}/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default LandingPage;