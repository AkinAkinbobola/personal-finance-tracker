package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction (Transaction transaction) {
        return transactionRepository.save(transaction);
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
