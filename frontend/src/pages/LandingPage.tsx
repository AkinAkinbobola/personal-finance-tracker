import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

const LandingPage = () => {
    return (
        <>
            <div className={"md:w-9/10 mx-auto w-full flex md:items-center md:justify-center"}>
                <div
                    className={"flex py-6 md:py-10 items-center justify-center w-full gap-y-6 flex-col-reverse md:flex-row"}>
                    <div className={"flex flex-col gap-y-6 md:w-2/5 text-center md:text-left"}>
                        <div className={"text-primary font-extrabold text-sm"}>
                            LET'S MANAGE YOUR FINANCES
                        </div>

                        <div className={"font-bold text-5xl w-[400px] md:w-[500px]"}>
                            Take control of your money with BudgetBuddy.
                        </div>

                        <div className={"text-xs text-muted-foreground w-[400px]"}>
                            With powerful budgeting tools and real-time tracking, you can monitor your income,
                            expenses,
                            and
                            savings effortlessly. Set goals, generate reports, and achieve financial stability with
                            ease.
                        </div>

                        <Button className={"w-full md:w-fit font-bold"} size={"lg"} asChild>
                            <Link to={"/transactions"}>
                                Get Started
                            </Link>
                        </Button>
                    </div>

                    <img src="/hero.jpg"
                         alt="Hero"
                         className="object-cover rounded-full size-[350px] md:size-[463px]"/>
                </div>
            </div>
        </>
    );
};

export default LandingPage;