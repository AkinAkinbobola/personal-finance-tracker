package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.IncomeExpenseDto;
import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;
import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportsServiceImpl implements ReportsService {
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

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


    @Override
    public List <IncomeExpenseDto> generateIncomeExpenseReport (String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        List <Transaction> transactions = transactionRepository.findByDateBetween(start, end, Sort.by(Sort.Direction.ASC, "date"));

        Map <LocalDate, IncomeExpenseDto> groupedData = transactions.stream()
                .collect(Collectors.toMap(
                        Transaction::getDate,
                        transaction -> new IncomeExpenseDto(
                                transaction.getDate(),
                                transaction.getType() == TransactionType.INCOME ? transaction.getAmount() : BigDecimal.ZERO,
                                transaction.getType() == TransactionType.EXPENSE ? transaction.getAmount() : BigDecimal.ZERO
                        ),
                        (dto1, dto2) -> new IncomeExpenseDto(
                                dto1.date(),
                                dto1.income().add(dto2.income()),
                                dto1.expenses().add(dto2.expenses())
                        )
                ));

        return groupedData.values().stream()
                .sorted(Comparator.comparing(IncomeExpenseDto::date))
                .toList();
    }
}
