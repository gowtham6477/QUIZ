package com.quiz.backend.controller;

import com.quiz.backend.dto.CreateQuestionRequest;
import com.quiz.backend.dto.CreateQuizRequest;
import com.quiz.backend.dto.UpdateQuestionRequest;
import com.quiz.backend.dto.UpdateQuizRequest;
import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private final AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @PostMapping("/quizzes")
  public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody CreateQuizRequest request) {
    return ResponseEntity.ok(adminService.createQuiz(request));
  }

  @PutMapping("/quizzes/{id}")
  public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id,
                                         @RequestBody UpdateQuizRequest request) {
    return ResponseEntity.ok(adminService.updateQuiz(id, request));
  }

  @DeleteMapping("/quizzes/{id}")
  public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
    adminService.deleteQuiz(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/quizzes/{id}/questions")
  public ResponseEntity<Question> addQuestion(@PathVariable Long id,
                                              @Valid @RequestBody CreateQuestionRequest request) {
    return ResponseEntity.ok(adminService.addQuestion(id, request));
  }

  @PutMapping("/questions/{id}")
  public ResponseEntity<Question> updateQuestion(@PathVariable Long id,
                                                 @RequestBody UpdateQuestionRequest request) {
    return ResponseEntity.ok(adminService.updateQuestion(id, request));
  }

  @DeleteMapping("/questions/{id}")
  public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
    adminService.deleteQuestion(id);
    return ResponseEntity.noContent().build();
  }
}
