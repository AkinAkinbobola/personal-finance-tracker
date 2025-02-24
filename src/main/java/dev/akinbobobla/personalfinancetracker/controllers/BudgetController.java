package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.dtos.BudgetDto;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Budget.BudgetMapper;
import dev.akinbobobla.personalfinancetracker.services.Budget.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.url}/budgets")
public class BudgetController {
    private final BudgetService budgetService;
    private final BudgetMapper budgetMapper;

    @PostMapping
    public ResponseEntity <?> createBudget (@Valid @RequestBody BudgetDto budgetDto) {
        try {
            return ResponseEntity.ok(budgetService.createBudget(budgetMapper.toEntity(budgetDto)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity <?> getBudgetByCategory (@PathVariable String categoryName) {
        try {
            return ResponseEntity.ok(budgetService.getBudgetByCategory(Category.builder().name(categoryName).build()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
