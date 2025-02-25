package dev.akinbobobla.personalfinancetracker.services.Budget;

import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.repositories.BudgetRepository;
import dev.akinbobobla.personalfinancetracker.services.Category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {
    private final BudgetRepository budgetRepository;
    private final CategoryService categoryService;

    @Override
    public Budget createBudget (Budget budget) {
        Category category = categoryService.getCategoryById(budget.getCategory().getId());

        return budgetRepository.findByMonthAndCategory(budget.getMonth(), category)
                .orElseGet(() -> budgetRepository.save(
                        Budget.builder()
                                .title(budget.getTitle())
                                .totalAmount(budget.getTotalAmount())
                                .month(budget.getMonth())
                                .category(category)
                                .build()
                ));
    }

    @Override
    public List<Budget> getBudgetByCategory (Category category) {
        Category existingCategory = categoryService.getCategoryByName(category.getName());
        return budgetRepository.findByCategory(existingCategory);
    }

    @Override
    public Budget updateBudget (Budget budget) {
        Budget existingBudget = budgetRepository.findById(budget.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Budget not found"));

        existingBudget.setTitle(budget.getTitle());
        existingBudget.setTotalAmount(budget.getTotalAmount());
        existingBudget.setSpentAmount(budget.getSpentAmount());
        existingBudget.setMonth(YearMonth.parse(budget.getMonth()));
        existingBudget.setCategory(budget.getCategory());

        return budgetRepository.save(budget);
    }
}
