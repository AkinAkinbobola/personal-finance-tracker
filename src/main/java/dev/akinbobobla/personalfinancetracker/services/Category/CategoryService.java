package dev.akinbobobla.personalfinancetracker.services.Category;

import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();

    Category createCategory (Category category);

    Category getCategoryById (Long id);

    List <Budget> getBudgets (Long id);
}
