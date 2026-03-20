package com.quiz.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "quiz_id", nullable = false)
  private Quiz quiz;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String questionText;

  @Column(nullable = false)
  private String optionA;

  @Column(nullable = false)
  private String optionB;

  @Column(nullable = false)
  private String optionC;

  @Column(nullable = false)
  private String optionD;

  @Column(nullable = false)
  private String correctOption;
}
