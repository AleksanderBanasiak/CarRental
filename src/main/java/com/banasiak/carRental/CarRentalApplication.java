package com.banasiak.carRental;

import com.banasiak.carRental.model.Role;
import com.banasiak.carRental.repo.RoleRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class CarRentalApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarRentalApplication.class, args);
	}


	@Bean
	public CommandLineRunner runner(RoleRepo roleRepo){
		return args -> {
			if(roleRepo.findByName("USER").isEmpty()){
				roleRepo.save(Role.builder()
								.name("USER")
								.build());
			}
		};

	}
	// 10:50:17
}
