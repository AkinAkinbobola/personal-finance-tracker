package dev.akinbobobla.personalfinancetracker.services.Budget;

import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;

import java.util.List;

public interface BudgetService {
    Budget createBudget(Budget budget);

    List<Budget> getBudgetByCategory(Category category);
}
