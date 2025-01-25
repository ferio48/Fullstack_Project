package com.pranav.fullstack_backend.dao;

import com.pranav.fullstack_backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    @Query("""
            select t from Token t inner join Employee e on t.employee.id = e.id
            where e.id = :empId and (t.expired = false or t.revoked = false)
            """)
    List<Token> findAllValidTokensByEmployee(Integer empId);

    Optional<Token> findByToken(String token);

    @Query("""
            select t from Token t inner join Employee e on t.employee.id = e.id
            where e.id = :empId
            """)
    List<Token> findAllTokensByEmployee(Integer empId);
}
