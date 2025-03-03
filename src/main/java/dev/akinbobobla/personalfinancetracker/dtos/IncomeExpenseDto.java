package dev.akinbobobla.personalfinancetracker.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;


public record IncomeExpenseDto(
        LocalDate date,
        BigDecimal income,
        BigDecimal expenses
) {
}
