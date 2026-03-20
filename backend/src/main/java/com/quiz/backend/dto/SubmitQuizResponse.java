package com.quiz.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class SubmitQuizResponse {
  private int score;
  private int total;
  private Map<Long, String> correctAnswers;
}
