package dev.akinbobobla.personalfinancetracker.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link dev.akinbobobla.personalfinancetracker.models.Category}
 */
@Value
public class CategoryDto implements Serializable {
    @NotBlank(message = "Category name is required")
    String name;
}