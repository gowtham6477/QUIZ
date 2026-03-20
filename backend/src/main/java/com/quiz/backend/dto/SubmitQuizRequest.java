package com.quiz.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubmitQuizRequest {
  private List<AnswerSubmission> answers;
}
