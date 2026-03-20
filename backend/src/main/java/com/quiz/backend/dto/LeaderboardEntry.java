package com.quiz.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaderboardEntry {
  private String username;
  private String college;
  private int score;
  private int total;
}
