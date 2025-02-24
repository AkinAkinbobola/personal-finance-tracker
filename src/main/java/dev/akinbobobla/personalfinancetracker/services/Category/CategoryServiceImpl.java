package dev.akinbobobla.personalfinancetracker.services.Category;

import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List <Category> getCategories () {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory (Category category) {
        category.setName(category.getName().toLowerCase());
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById (Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @Override
    public List <Budget> getBudgets (Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"))
                .getBudgets();
    }

    @Override
    public Category getCategoryByName (String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
}
