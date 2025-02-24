package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.dtos.CategoryDto;
import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Category.CategoryMapper;
import dev.akinbobobla.personalfinancetracker.services.Category.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.url}/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity <?> getAllCategories () {
        try {
            return ResponseEntity.ok(categoryService.getCategories());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity <?> createCategory (@Valid @RequestBody CategoryDto categoryDto) {
        try {
            return ResponseEntity.ok(categoryService.createCategory(categoryMapper.toEntity(categoryDto)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/{id}/budgets")
    public ResponseEntity<?> getBudget(@PathVariable Long id){
        try {
            return ResponseEntity.ok(categoryService.getBudgets(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
