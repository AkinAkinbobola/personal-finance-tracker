package dev.akinbobobla.personalfinancetracker.services.Budget;

import dev.akinbobobla.personalfinancetracker.dtos.BudgetDto;
import dev.akinbobobla.personalfinancetracker.models.Budget;
import dev.akinbobobla.personalfinancetracker.models.Category;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface BudgetMapper {
    @Mapping(target = "category", source = "categoryId", qualifiedByName = "toCategory")
    Budget toEntity (BudgetDto budgetDto);

    BudgetDto toDto (Budget budget);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Budget partialUpdate (BudgetDto budgetDto, @MappingTarget Budget budget);

    @Named("toCategory")
    default Category toCategory (Long id) {
        return Category.builder().id(id).build();
    }
}