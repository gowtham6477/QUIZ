package com.quiz.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuizDetailResponse {
  private Long id;
  private String title;
  private String description;
  private String category;
  private String difficulty;
  private List<QuestionResponse> questions;
}
