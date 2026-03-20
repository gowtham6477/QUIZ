package com.quiz.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateQuestionRequest {
  @NotBlank
  private String questionText;

  @NotBlank
  private String optionA;

  @NotBlank
  private String optionB;

  @NotBlank
  private String optionC;

  @NotBlank
  private String optionD;

  @NotBlank
  private String correctOption;
}
