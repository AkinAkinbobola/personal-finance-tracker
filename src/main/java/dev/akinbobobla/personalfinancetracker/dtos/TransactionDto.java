package dev.akinbobobla.personalfinancetracker.dtos;

import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for {@link dev.akinbobobla.personalfinancetracker.models.Transaction}
 */
@Value
public class TransactionDto implements Serializable {
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be a valid number")
    BigDecimal amount;
    @NotBlank(message = "Description is required")
    String description;
    @NotBlank(message = "Category is required")
    String category;
    @NotNull(message = "Transaction type is required")
    TransactionType type;
    LocalDate date;
}