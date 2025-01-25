package com.pranav.fullstack_backend.dao;

import com.pranav.fullstack_backend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StorageRepository extends JpaRepository<Image, Integer> {
    Optional<Image> findByName(String name);

    void deleteByName(String fileName);
}
