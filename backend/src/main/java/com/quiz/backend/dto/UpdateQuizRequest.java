package com.quiz.backend.dto;

import lombok.Data;

@Data
public class UpdateQuizRequest {
  private String title;
  private String description;
  private String category;
  private String difficulty;
}
