package com.quiz.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateQuizRequest {
  @NotBlank
  private String title;

  private String description;
  private String category;
  private String difficulty;
}
