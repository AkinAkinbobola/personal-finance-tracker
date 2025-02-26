package dev.akinbobobla.personalfinancetracker.dtos;

import java.math.BigDecimal;

public record MonthlySpendingReportDto(
        String categoryName,
        BigDecimal totalSpent
) {
}
