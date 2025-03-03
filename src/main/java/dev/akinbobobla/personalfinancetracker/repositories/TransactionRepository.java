package dev.akinbobobla.personalfinancetracker.repositories;

import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository <Transaction, Long> {
    List<Transaction> findAllByCategoryAndDateBetween (Category category, LocalDate dateAfter, LocalDate dateBefore);

    List<Transaction> findByDateBetween (LocalDate dateAfter, LocalDate dateBefore, Sort sort);
}