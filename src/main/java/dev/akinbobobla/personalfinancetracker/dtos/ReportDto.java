package dev.akinbobobla.personalfinancetracker.dtos;

import java.math.BigDecimal;

public record ReportDto(
        String date,
        BigDecimal amount,
        String type,
        String category
) {
}
