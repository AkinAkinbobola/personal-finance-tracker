package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;
import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportsServiceImpl implements ReportsService {
    private final CategoryRepository categoryRepository;

    @Override
    public List <MonthlySpendingReportDto> generateMonthlySpendingReport (String month) {
        YearMonth yearMonth = YearMonth.parse(month);

        return categoryRepository
                .findAll()
                .stream().map(category -> {
                    BigDecimal totalSpent = category.getTransactions()
                            .stream()
                            .filter(transaction -> {
                                YearMonth transactionMonth = YearMonth.from(transaction.getDate());
                                return transactionMonth.equals(yearMonth);
                            })
                            .filter(transaction -> transaction.getType() == TransactionType.EXPENSE)
                            .map(Transaction::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    return new MonthlySpendingReportDto(category.getName(), totalSpent);
                })
                .collect(Collectors.toList());
    }
}
