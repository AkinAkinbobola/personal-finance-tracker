package dev.akinbobobla.personalfinancetracker.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReportDto(
        LocalDate date,
        BigDecimal amount,
        String type,
        String category
) {
}
