import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/axios/axiosInstance.ts";
import {capitalize, getRandomColor} from "@/lib/utils.ts";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {LabelList, Pie, PieChart} from "recharts";
import {MonthlySpending} from "@/types/MonthlySpending.ts";

const MonthlySpendingReport = () => {
    const spending = useQuery({
        queryKey: ["spending", "2025-02"],
        queryFn: async () => {
            const response = await axiosInstance.get<MonthlySpending[]>("reports/spending", {
                params: {
                    month: "2025-02",
                }
            });
            return response.data;
        }
    })

    const spendingData = spending.data && spending.data.map((item) => ({
        ...item,
        fill: getRandomColor()
    }));

    const chartConfig = spending.data && spending.data.reduce((config, item, _index) => {
        config[item.categoryName.toLowerCase()] = {
            label: capitalize(item.categoryName),
        };
        return config;
    }, {} as ChartConfig) || {};
    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full"}>
            {
                spending.data &&
                <ChartContainer config={chartConfig}
                                className="mx-auto aspect-square max-h-[500px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey={"categoryName"}/>}/>

                        <Pie dataKey={"totalSpent"} data={spendingData} nameKey={"categoryName"}>
                            <LabelList
                                dataKey={"categoryName"}
                                className={"fill-background"}
                                stroke={"none"}
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />

                        </Pie>
                    </PieChart>
                </ChartContainer>
            }
        </main>
    );
};

export default MonthlySpendingReport;