package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.BudgetRepository;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetRepository budgetRepository;

    @Override
    public Transaction createTransaction (Transaction transaction) {
        String categoryName = transaction.getCategory().getName().toLowerCase();

        Category category = categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = Category.builder()
                            .name(categoryName)
                            .transactions(new ArrayList <>())
                            .budgets(new ArrayList <>())
                            .build();
                    return categoryRepository.save(newCategory);
                });

        transaction.setCategory(category);

        String transactionMonth = getMonth(transaction);

        Optional <Budget> budgetOptional = budgetRepository.findByMonthAndCategory(transactionMonth, category);

        Budget budget = budgetOptional.orElseGet(() -> budgetRepository.save(
                Budget.builder()
                        .totalAmount(BigDecimal.valueOf(500000))
                        .month(transactionMonth)
                        .category(category)
                        .transactions(new ArrayList <>())
                        .build()
        ));

        transaction.setBudget(budget);

        Transaction newTransaction = transactionRepository.save(transaction);

        budget.getTransactions().add(newTransaction);
        budget.updateSpentAmount();

        budgetRepository.save(budget);

        return newTransaction;
    }

    private String getMonth (Transaction transaction) {
        YearMonth yearMonth = YearMonth.from(transaction.getDate());
        return yearMonth.toString();
    }

    @Override
    public Transaction updateTransaction (Transaction transaction) {
        Transaction existingTransaction = getExistingTransaction(transaction);

        boolean categoryChanged = !existingTransaction.getCategory().equals(transaction.getCategory());
        boolean amountChanged = existingTransaction.getAmount().compareTo(transaction.getAmount()) != 0;
        boolean dateChanged = !getMonth(existingTransaction).equals(getMonth(transaction));

        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setDate(transaction.getDate());
        existingTransaction.setType(transaction.getType());

        Transaction updatedTransaction = transactionRepository.save(existingTransaction);

        if (categoryChanged || amountChanged || dateChanged) {
            updateBudget(existingTransaction);
            updateBudget(updatedTransaction);
        }

        return updatedTransaction;
    }

    private void updateBudget(Transaction transaction) {
        String transactionMonth = getMonth(transaction);
        Optional<Budget> budgetOptional = budgetRepository.findByMonthAndCategory(transactionMonth, transaction.getCategory());

        if (budgetOptional.isPresent()) {
            Budget budget = budgetOptional.get();
            List<Transaction> transactions = transactionRepository.findAllByCategoryAndDateBetween(
                    budget.getCategory(),
                    YearMonth.parse(budget.getMonth()).atDay(1),
                    YearMonth.parse(budget.getMonth()).atEndOfMonth()
            );

            budget.setTransactions(transactions);
            budget.updateSpentAmount();
            budgetRepository.save(budget);
        }
    }

    private Transaction getExistingTransaction (Transaction transaction) {
        return transactionRepository.findById(transaction.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
    }

    @Override
    public void deleteTransaction (Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        Budget budget = transaction.getBudget();

        transactionRepository.delete(transaction);

        if (budget != null) {
            budget.getTransactions().remove(transaction);
            budget.updateSpentAmount();
            budgetRepository.save(budget);
        }
    }

    @Override
    public List <Transaction> getTransactions () {
        return transactionRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
    }
}
