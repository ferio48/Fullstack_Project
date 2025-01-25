package com.pranav.fullstack_backend.mapper;

import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.model.dto.EmployeeDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EmployeeMapper {
    @Mapping(source = "tokenDtoList", target = "tokenList", ignore = true)
    Employee toEntity(EmployeeDto employeeDto);
    @Mapping(source = "tokenList", target = "tokenDtoList", ignore = true)
    EmployeeDto toDto(Employee employee);
}
