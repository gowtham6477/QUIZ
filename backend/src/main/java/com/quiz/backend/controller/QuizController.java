package com.quiz.backend.controller;

import com.quiz.backend.dto.QuizDetailResponse;
import com.quiz.backend.dto.QuizSummaryResponse;
import com.quiz.backend.dto.SubmitQuizRequest;
import com.quiz.backend.dto.SubmitQuizResponse;
import com.quiz.backend.service.AttemptService;
import com.quiz.backend.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
  private final QuizService quizService;
  private final AttemptService attemptService;

  public QuizController(QuizService quizService, AttemptService attemptService) {
    this.quizService = quizService;
    this.attemptService = attemptService;
  }

  @GetMapping
  public ResponseEntity<List<QuizSummaryResponse>> getQuizzes() {
    return ResponseEntity.ok(quizService.getQuizzes());
  }

  @GetMapping("/attempts")
  public ResponseEntity<List<Long>> getAttemptedQuizzes(Principal principal) {
    if (principal == null) {
      return ResponseEntity.ok(List.of());
    }
    return ResponseEntity.ok(attemptService.getAttemptedQuizIds(principal.getName()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<QuizDetailResponse> getQuiz(@PathVariable Long id) {
    return ResponseEntity.ok(quizService.getQuizDetails(id));
  }

  @PostMapping("/{id}/submit")
  public ResponseEntity<SubmitQuizResponse> submit(@PathVariable Long id,
                                                   @Valid @RequestBody SubmitQuizRequest request,
                                                   Principal principal) {
    return ResponseEntity.ok(attemptService.submitQuiz(principal.getName(), id, request));
  }
}
