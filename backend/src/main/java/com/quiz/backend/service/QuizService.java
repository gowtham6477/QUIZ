package com.quiz.backend.service;

import com.quiz.backend.dto.QuestionResponse;
import com.quiz.backend.dto.QuizDetailResponse;
import com.quiz.backend.dto.QuizSummaryResponse;
import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {
  private final QuizRepository quizRepository;
  private final QuestionRepository questionRepository;

  public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository) {
    this.quizRepository = quizRepository;
    this.questionRepository = questionRepository;
  }

  public List<QuizSummaryResponse> getQuizzes() {
    return quizRepository.findAll().stream()
        .map(quiz -> QuizSummaryResponse.builder()
            .id(quiz.getId())
            .title(quiz.getTitle())
            .description(quiz.getDescription())
            .category(quiz.getCategory())
            .difficulty(quiz.getDifficulty())
            .questionCount(quiz.getQuestions().size())
            .build())
        .collect(Collectors.toList());
  }

  public QuizDetailResponse getQuizDetails(Long quizId) {
    Quiz quiz = quizRepository.findById(quizId)
        .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

    List<QuestionResponse> questions = questionRepository.findByQuizId(quizId).stream()
        .map(this::toQuestionResponse)
        .collect(Collectors.toList());

    return QuizDetailResponse.builder()
        .id(quiz.getId())
        .title(quiz.getTitle())
        .description(quiz.getDescription())
        .category(quiz.getCategory())
        .difficulty(quiz.getDifficulty())
        .questions(questions)
        .build();
  }

  private QuestionResponse toQuestionResponse(Question question) {
    return QuestionResponse.builder()
        .id(question.getId())
        .questionText(question.getQuestionText())
        .optionA(question.getOptionA())
        .optionB(question.getOptionB())
        .optionC(question.getOptionC())
        .optionD(question.getOptionD())
        .build();
  }
}
