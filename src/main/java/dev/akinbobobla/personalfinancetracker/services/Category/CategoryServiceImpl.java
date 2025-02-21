package dev.akinbobobla.personalfinancetracker.services.Category;

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
}
