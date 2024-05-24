package com.banasiak.carRental.repo;

import com.banasiak.carRental.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {


    Optional<Role> findByName(String name);

}
