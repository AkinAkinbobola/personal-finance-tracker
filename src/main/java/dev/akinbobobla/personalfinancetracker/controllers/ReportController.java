package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.dtos.ReportDto;
import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Reports.ReportsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

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

    @GetMapping
    public ResponseEntity <?> getReport (@RequestParam(required = false) List <String> categories, @RequestParam String startDate, @RequestParam String endDate) {
        try {
            return ResponseEntity.ok(reportsService.generateReport(categories, startDate, endDate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }


    @PostMapping("export")
    public ResponseEntity <?> generateCsv (@Valid @RequestBody List <ReportDto> reportDtoList) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(ContentDisposition.attachment().filename("report.csv").build());
            headers.setContentType(MediaType.TEXT_PLAIN);

            byte[] csvBytes = reportsService.generateCsvReport(reportDtoList).getBytes();

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvBytes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
