package com.bachir.api.config;

import com.bachir.api.entity.User;
import com.bachir.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("bachir2024"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println(">>> Compte admin créé : admin / bachir2024");
        }
    }
}
