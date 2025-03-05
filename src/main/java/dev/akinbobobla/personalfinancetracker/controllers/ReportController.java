package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Reports.ReportsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.url}/reports")
public class ReportController {
    private final ReportsService reportsService;

    @GetMapping("/monthly-spending")
    public ResponseEntity <?> monthlySpendingReport (@RequestParam String month) {
        try {
            try {
                YearMonth.parse(month);
            } catch (Exception e) {
                throw new Exception("Invalid month format. Please use the format YYYY-MM");
            }

            return ResponseEntity.ok(reportsService.generateMonthlySpendingReport(month));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/monthly-spending-csv")
    public ResponseEntity <?> monthlySpendingReportCsv (@RequestParam String month) {
        try {
            try {
                YearMonth.parse(month);
            } catch (Exception e) {
                throw new Exception("Invalid month format. Please use the format YYYY-MM");
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(ContentDisposition.attachment().filename("report.csv").build());
            headers.setContentType(MediaType.TEXT_PLAIN);

            byte[] csvContent = reportsService.generateMonthlySpendingReportCsv(month).getBytes();

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvContent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/income-expense")
    public ResponseEntity <?> incomeExpense (@RequestParam String startDate, @RequestParam String endDate) {
        try {
            return ResponseEntity.ok(reportsService.generateIncomeExpenseReport(startDate, endDate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/income-expense-csv")
    public ResponseEntity <?> incomeExpenseCsv (@RequestParam String startDate, @RequestParam String endDate) {
        try {
            byte[] csvContent = reportsService.generateIncomeExpenseReportCsv(startDate, endDate).getBytes();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(ContentDisposition.attachment().filename("report.csv").build());
            headers.setContentType(MediaType.TEXT_PLAIN);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvContent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
