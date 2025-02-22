package dev.akinbobobla.personalfinancetracker.repositories;

import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository <Budget, Long> {
    Optional <Budget> findByMonthAndCategory (YearMonth month, Category category);
}