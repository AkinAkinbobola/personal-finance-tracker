package dev.akinbobobla.personalfinancetracker.services.Reports;

import dev.akinbobobla.personalfinancetracker.dtos.IncomeExpenseDto;
import dev.akinbobobla.personalfinancetracker.dtos.MonthlySpendingReportDto;
import dev.akinbobobla.personalfinancetracker.dtos.ReportDto;
import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import dev.akinbobobla.personalfinancetracker.exceptions.ResourceNotFoundException;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import dev.akinbobobla.personalfinancetracker.repositories.CategoryRepository;
import dev.akinbobobla.personalfinancetracker.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
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

    @Override
    public List <ReportDto> generateReport (List <String> categories, String startDate, String endDate) {
        List <Category> categoryList;

        if (categories == null) {
            categoryList = categoryRepository.findAll();
        } else {
            categoryList = categories.stream().map(s -> categoryRepository.findByName(s.toLowerCase())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"))).toList();
        }

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        List <Transaction> transactions = transactionRepository.findByDateBetween(start, end, Sort.by(Sort.Direction.ASC, "date"));

        List <Category> finalCategoryList = categoryList;

        List <Transaction> filteredTransactions = transactions.stream()
                .filter(transaction -> finalCategoryList.contains(transaction.getCategory()))
                .toList();

        return filteredTransactions.stream().map(transaction -> new ReportDto(
                transaction.getDate(),
                transaction.getAmount(),
                transaction.getType().name(),
                transaction.getCategory().getName()
        )).toList();
    }

    @Override
    public String generateCsvReport (List <ReportDto> reportDtoList) {
        String header = "Date,Category,Type,Amount\n";
        StringBuilder csvContent = new StringBuilder();
        csvContent.append(header);

        for (ReportDto reportDto : reportDtoList) {
            csvContent.append(reportDto.date()).append(",");
            csvContent.append(StringUtils.capitalize(reportDto.category())).append(",");
            csvContent.append(reportDto.type()).append(",");
            csvContent.append(reportDto.amount()).append("\n");
        }

        return csvContent.toString();
    }
}
