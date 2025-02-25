package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import dev.akinbobobla.personalfinancetracker.services.Budget.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetService budgetService;

    @Override
    public Transaction createTransaction (Transaction transaction) {
        Category category = categoryRepository.findByName(transaction.getCategory().getName().toLowerCase())
                .orElseGet(() -> {
                    transaction.getCategory().setName(transaction.getCategory().getName().toLowerCase());
                    return categoryRepository.save(transaction.getCategory());
                });

        transaction.setCategory(category);

        Transaction newTransaction = transactionRepository.save(transaction);

        List <Budget> budgets = budgetService.getBudgetByCategory(category).stream()
                .filter(budget -> budget.getMonth().equals(getMonth(newTransaction))).toList();

        Optional <Budget> transactionBudget = budgets.stream()
                .filter(budget -> Objects.equals(budget.getMonth(), getMonth(newTransaction)))
                .findFirst();

        List <Transaction> foundTransactions = category.getTransactions().stream()
                .filter(t -> getMonth(t).equals(getMonth(newTransaction)) && t.getType() == TransactionType.EXPENSE)
                .toList();

        BigDecimal totalAmount = foundTransactions.stream().map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        if (transactionBudget.isPresent()) {
            Budget budget = transactionBudget.get();
            budget.setSpentAmount(totalAmount);
            budgetService.updateBudget(budget);
        }

        return newTransaction;
    }

    private String getMonth (Transaction transaction) {
        YearMonth yearMonth = YearMonth.from(transaction.getDate());
        return yearMonth.toString();
    }

    @Override
    public Transaction updateTransaction (Transaction transaction) {
        Transaction existingTransaction = getExistingTransaction(transaction);

        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setDate(transaction.getDate());
        existingTransaction.setType(transaction.getType());

        return transactionRepository.save(existingTransaction);
    }

    private Transaction getExistingTransaction (Transaction transaction) {
        return transactionRepository.findById(transaction.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
    }

    @Override
    public void deleteTransaction (Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        transactionRepository.delete(transaction);
    }

    @Override
    public List <Transaction> getTransactions () {
        return transactionRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
    }
}
