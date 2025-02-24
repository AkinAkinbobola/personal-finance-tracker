package dev.akinbobobla.personalfinancetracker.dtos;

import dev.akinbobobla.personalfinancetracker.models.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.YearMonth;

/**
 * DTO for {@link dev.akinbobobla.personalfinancetracker.models.Budget}
 */
@Value
public class BudgetDto implements Serializable {
    @Positive(message = "Valid amount required")
    BigDecimal totalAmount;
    @NotNull(message = "Month is required")
    YearMonth month;
    @NotNull(message = "Category id is required")
    Long categoryId;
}