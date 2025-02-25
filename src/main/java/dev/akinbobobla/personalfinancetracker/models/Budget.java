package dev.akinbobobla.personalfinancetracker.models;

import dev.akinbobobla.personalfinancetracker.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List <Transaction> transactions = new ArrayList <>();

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

    public void updateSpentAmount () {
        this.spentAmount = this.transactions.stream()
                .filter(transaction -> transaction.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}