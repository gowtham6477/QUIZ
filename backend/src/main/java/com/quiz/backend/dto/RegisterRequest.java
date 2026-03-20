package com.quiz.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
  @NotBlank
  private String username;

  @Email
  @NotBlank
  private String email;

  private String college;

  @NotBlank
  private String password;
}
