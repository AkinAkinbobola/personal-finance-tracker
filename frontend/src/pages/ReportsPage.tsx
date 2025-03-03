import IncomeExpenseReport from "@/components/shared/IncomeExpenseReport.tsx";
import ReportTable from "@/components/shared/ReportTable.tsx";

const ReportsPage = () => {
    return (
        <main className={"px-2 py-2 md:py-4 sm:px-6 lg:px-8 h-full space-y-4"}>
            <ReportTable/>

            <IncomeExpenseReport/>
        </main>
    );
};

export default ReportsPage;