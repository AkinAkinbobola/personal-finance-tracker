package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.dtos.TransactionDto;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Transaction.TransactionMapper;
import dev.akinbobobla.personalfinancetracker.services.Transaction.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.url}/transactions")
public class TransactionController {
    private final TransactionService transactionService;
    private final TransactionMapper transactionMapper;

    @PostMapping
    public ResponseEntity <?> createTransaction (@Valid @RequestBody TransactionDto transactionDto) {
        try {
            Transaction transaction = transactionMapper.toEntity(transactionDto);
            return ResponseEntity.ok(transactionService.createTransaction(transaction));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity <?> getTransactions () {
        try {
            return ResponseEntity.ok(transactionService.getTransactions());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <?> deleteTransaction (@PathVariable Long id) {
        try {
            transactionService.deleteTransaction(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity <?> updateTransaction (@PathVariable Long id, @Valid @RequestBody TransactionDto transactionDto) {
        try {
            Transaction transaction = transactionMapper.toEntity(transactionDto);
            transaction.setId(id);
            return ResponseEntity.ok(transactionService.updateTransaction(transaction));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
