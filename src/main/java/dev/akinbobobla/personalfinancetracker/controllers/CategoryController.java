package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.services.Category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.url}/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity <?> getAllCategories () {
        return ResponseEntity.ok(categoryService.getCategories());
    }
}
