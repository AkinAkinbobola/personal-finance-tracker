package dev.akinbobobla.personalfinancetracker.services.Budget;

import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.BudgetRepository;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import dev.akinbobobla.personalfinancetracker.services.Category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {
    private final BudgetRepository budgetRepository;
    private final CategoryService categoryService;
    private final TransactionRepository transactionRepository;

    @Override
    public Budget createBudget (Budget budget) {
        Category category = categoryService.getCategoryById(budget.getCategory().getId());

        Optional <Budget> existingBudget = budgetRepository.findByMonthAndCategory(budget.getMonth(), category);

        if (existingBudget.isPresent()) {
            return existingBudget.get();
        }

        Budget newBudget = Budget.builder()
                .totalAmount(budget.getTotalAmount())
                .month(budget.getMonth())
                .category(category)
                .build();

        Budget savedBudget = budgetRepository.save(newBudget);

        attachTransactionsToBudget(savedBudget);

        return savedBudget;
    }

    public void attachTransactionsToBudget (Budget budget) {
        List <Transaction> transactions = transactionRepository.findAllByCategoryAndDateBetween(
                budget.getCategory(),
                YearMonth.parse(budget.getMonth()).atDay(1),
                YearMonth.parse(budget.getMonth()).atEndOfMonth()
        );

        transactions.forEach(transaction -> transaction.setBudget(budget));

        transactionRepository.saveAll(transactions);

        budget.setTransactions(transactions);

        budget.updateSpentAmount();

        budgetRepository.save(budget);
    }

    @Override
    public List <Budget> getBudgetByCategory (Category category) {
        Category existingCategory = categoryService.getCategoryByName(category.getName());


        return budgetRepository.findByCategory(existingCategory);
    }
}
