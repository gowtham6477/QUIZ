package com.quiz.backend.config;

import com.quiz.backend.model.Role;
import com.quiz.backend.model.User;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
public class AdminSeeder {
  @Bean
  public ApplicationRunner seedAdmin(UserRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     @Value("${QUIZ_ADMIN_EMAIL:admin@quiz.local}") String adminEmail,
                                     @Value("${QUIZ_ADMIN_PASSWORD:admin123}") String adminPassword) {
    return args -> {
      if (userRepository.existsByEmail(adminEmail)) {
        return;
      }
      User admin = User.builder()
          .username("admin")
          .email(adminEmail)
          .passwordHash(passwordEncoder.encode(adminPassword))
          .role(Role.ADMIN)
          .createdAt(Instant.now())
          .build();
      userRepository.save(admin);
    };
  }
}
