package com.banasiak.carRental.repo;

import com.banasiak.carRental.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<Token, Long> {


    Optional<Token> findByToken(String token);

}
