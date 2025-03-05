package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.IncomeExpenseDto;
import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;

import java.util.List;

public interface ReportsService {
    List <MonthlySpendingReportDto> generateMonthlySpendingReport (String month);

    String generateMonthlySpendingReportCsv (String month);

    List <IncomeExpenseDto> generateIncomeExpenseReport (String startDate, String endDate);

    String generateIncomeExpenseReportCsv (String startDate, String endDate);
}
