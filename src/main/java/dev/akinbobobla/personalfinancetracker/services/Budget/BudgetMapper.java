package dev.akinbobobla.personalfinancetracker.services.Budget;

import dev.akinbobobla.personalfinancetracker.dtos.BudgetDto;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import org.mapstruct.*;

import java.time.YearMonth;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface BudgetMapper {
    @Mapping(target = "category", source = "categoryId", qualifiedByName = "toCategory")
    @Mapping(target = "month", source = "month", qualifiedByName = "toString")
    Budget toEntity (BudgetDto budgetDto);

    @Named("toCategory")
    default Category toCategory (Long id) {
        return Category.builder().id(id).build();
    }

    @Named("toString")
    default String toString(YearMonth yearMonth){
        return yearMonth.toString();
    }
}