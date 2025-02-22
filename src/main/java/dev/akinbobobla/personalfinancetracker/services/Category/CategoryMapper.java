package dev.akinbobobla.personalfinancetracker.services.Category;

import dev.akinbobobla.personalfinancetracker.dtos.CategoryDto;
import dev.akinbobobla.personalfinancetracker.models.Category;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper {
    Category toEntity (CategoryDto categoryDto);

    CategoryDto toDto (Category category);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Category partialUpdate (CategoryDto categoryDto, @MappingTarget Category category);
}