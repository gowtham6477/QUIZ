package com.quiz.backend.service;

import com.quiz.backend.dto.AuthRequest;
import com.quiz.backend.dto.AuthResponse;
import com.quiz.backend.dto.RegisterRequest;
import com.quiz.backend.dto.UserProfileResponse;
import com.quiz.backend.model.Role;
import com.quiz.backend.model.User;
import com.quiz.backend.repository.UserRepository;
import com.quiz.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthService(UserRepository userRepository,
                     PasswordEncoder passwordEncoder,
                     JwtService jwtService,
                     AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new IllegalArgumentException("Email already registered");
    }
    if (userRepository.existsByUsername(request.getUsername())) {
      throw new IllegalArgumentException("Username already taken");
    }

    User user = User.builder()
        .username(request.getUsername())
        .email(request.getEmail())
    .college(request.getCollege())
        .passwordHash(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .createdAt(Instant.now())
        .build();

    userRepository.save(user);
    String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

    return AuthResponse.builder()
        .token(token)
        .tokenType("Bearer")
        .userId(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
    .role(user.getRole().name())
    .college(user.getCollege())
        .build();
  }

  public AuthResponse login(AuthRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

    String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

    return AuthResponse.builder()
        .token(token)
        .tokenType("Bearer")
        .userId(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
    .role(user.getRole().name())
    .college(user.getCollege())
        .build();
  }

  public UserProfileResponse getProfile(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    return UserProfileResponse.builder()
        .userId(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .role(user.getRole().name())
        .college(user.getCollege())
        .build();
  }
}
