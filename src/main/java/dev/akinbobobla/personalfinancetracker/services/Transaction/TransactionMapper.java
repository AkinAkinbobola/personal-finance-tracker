package dev.akinbobobla.personalfinancetracker.services.Transaction;

import dev.akinbobobla.personalfinancetracker.dtos.TransactionDto;
import dev.akinbobobla.personalfinancetracker.models.Transaction;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TransactionMapper {
    Transaction toEntity (TransactionDto transactionDto);

    TransactionDto toDto (Transaction transaction);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Transaction partialUpdate (TransactionDto transactionDto, @MappingTarget Transaction transaction);
}