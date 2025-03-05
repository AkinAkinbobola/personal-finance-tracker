package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.IncomeExpenseDto;
import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;
import dev.akinbobobla.personalfinancetracker.dtos.ReportDto;

import java.util.List;

public interface ReportsService {
    List <MonthlySpendingReportDto> generateMonthlySpendingReport (String month);

    List<IncomeExpenseDto> generateIncomeExpenseReport (String startDate, String endDate);

    List<ReportDto> generateReport (List <String> categories, String startDate, String endDate);

    String generateCsvReport (List <ReportDto> reportDtoList);
}
