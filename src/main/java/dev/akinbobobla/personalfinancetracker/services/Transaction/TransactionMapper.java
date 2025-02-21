package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.dtos.TransactionDto;
import dev.akinbobobla.personalfinancetracker.models.Category;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TransactionMapper {
    @Mapping(target = "category", source = "category", qualifiedByName = "toCategory")
    Transaction toEntity (TransactionDto transactionDto);

    @Mapping(target = "category", source = "category", qualifiedByName = "fromCategory")
    TransactionDto toDto (Transaction transaction);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "category", source = "category", qualifiedByName = "toCategory")
    Transaction partialUpdate (TransactionDto transactionDto, @MappingTarget Transaction transaction);

    @Named("toCategory")
    default Category toCategory (String value) {
        return Category.builder().name(value.toLowerCase()).build();
    }

    @Named("fromCategory")
    default String fromCategory (Category category) {
        return category.getName();
    }
}