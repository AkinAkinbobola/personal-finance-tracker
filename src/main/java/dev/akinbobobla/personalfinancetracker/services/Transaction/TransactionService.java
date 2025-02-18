package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.models.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Transaction transaction);
    Transaction updateTransaction(Transaction transaction);
    void deleteTransaction(Long id);
    List<Transaction> getTransactions();
}
