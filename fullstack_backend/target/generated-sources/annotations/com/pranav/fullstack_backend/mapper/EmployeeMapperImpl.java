package com.pranav.fullstack_backend.mapper;

import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.model.dto.EmployeeDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-15T18:01:23+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.1 (Oracle Corporation)"
)
@Component
public class EmployeeMapperImpl implements EmployeeMapper {

    @Override
    public Employee toEntity(EmployeeDto employeeDto) {
        if ( employeeDto == null ) {
            return null;
        }

        Employee.EmployeeBuilder employee = Employee.builder();

        employee.id( employeeDto.getId() );
        employee.firstname( employeeDto.getFirstname() );
        employee.lastname( employeeDto.getLastname() );
        employee.email( employeeDto.getEmail() );
        employee.password( employeeDto.getPassword() );
        employee.expertise( employeeDto.getExpertise() );
        employee.dob( employeeDto.getDob() );
        employee.company( employeeDto.getCompany() );
        employee.experience( employeeDto.getExperience() );
        employee.gender( employeeDto.getGender() );
        employee.role( employeeDto.getRole() );

        return employee.build();
    }

    @Override
    public EmployeeDto toDto(Employee employee) {
        if ( employee == null ) {
            return null;
        }

        EmployeeDto.EmployeeDtoBuilder employeeDto = EmployeeDto.builder();

        employeeDto.id( employee.getId() );
        employeeDto.firstname( employee.getFirstname() );
        employeeDto.lastname( employee.getLastname() );
        employeeDto.email( employee.getEmail() );
        employeeDto.password( employee.getPassword() );
        employeeDto.expertise( employee.getExpertise() );
        employeeDto.dob( employee.getDob() );
        employeeDto.company( employee.getCompany() );
        employeeDto.experience( employee.getExperience() );
        employeeDto.gender( employee.getGender() );
        employeeDto.role( employee.getRole() );

        return employeeDto.build();
    }
}
