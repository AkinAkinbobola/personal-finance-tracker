package dev.akinbobobla.personalfinancetracker.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "budget")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String title;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "spent_amount", nullable = false)
    private BigDecimal spentAmount = BigDecimal.ZERO;

    @Column(name = "month", nullable = false)
    private String month;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @PrePersist
    public void prePersist () {
        YearMonth yearMonth = YearMonth.parse(this.month, DateTimeFormatter.ofPattern("yyyy-MM"));
        this.title = yearMonth.getMonth().name() + " " + yearMonth.getYear();

        if (this.spentAmount == null) {
            this.spentAmount = BigDecimal.ZERO;
        }
    }

    public void setMonth (YearMonth yearMonth) {
        this.month = yearMonth.format(DateTimeFormatter.ofPattern("yyyy-MM"));
    }
}