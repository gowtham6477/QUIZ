package com.quiz.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizSummaryResponse {
  private Long id;
  private String title;
  private String description;
  private String category;
  private String difficulty;
  private int questionCount;
}
