package dev.akinbobobla.personalfinancetracker.controllers;

import dev.akinbobobla.personalfinancetracker.responses.ErrorResponse;
import dev.akinbobobla.personalfinancetracker.services.Reports.ReportsService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/spending")
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
}
