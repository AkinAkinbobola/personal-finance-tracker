package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;

import java.util.List;

public interface ReportsService {
    List <MonthlySpendingReportDto> generateMonthlySpendingReport (String month);
}
