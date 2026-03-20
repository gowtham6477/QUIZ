package com.quiz.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {
  private Long userId;
  private String username;
  private String email;
  private String role;
  private String college;
}
