package com.quiz.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerSubmission {
  @NotNull
  private Long questionId;

  @NotBlank
  private String selectedOption;
}
