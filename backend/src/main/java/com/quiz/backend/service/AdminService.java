package com.quiz.backend.service;

import com.quiz.backend.dto.CreateQuestionRequest;
import com.quiz.backend.dto.CreateQuizRequest;
import com.quiz.backend.dto.UpdateQuestionRequest;
import com.quiz.backend.dto.UpdateQuizRequest;
import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AdminService {
  private final QuizRepository quizRepository;
  private final QuestionRepository questionRepository;

  public AdminService(QuizRepository quizRepository, QuestionRepository questionRepository) {
    this.quizRepository = quizRepository;
    this.questionRepository = questionRepository;
  }

  public Quiz createQuiz(CreateQuizRequest request) {
    Quiz quiz = Quiz.builder()
        .title(request.getTitle())
        .description(request.getDescription())
        .category(request.getCategory())
        .difficulty(request.getDifficulty())
        .createdAt(Instant.now())
        .build();

    return quizRepository.save(quiz);
  }

  public Quiz updateQuiz(Long quizId, UpdateQuizRequest request) {
    Quiz quiz = quizRepository.findById(quizId)
        .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

    if (request.getTitle() != null) {
      quiz.setTitle(request.getTitle());
    }
    if (request.getDescription() != null) {
      quiz.setDescription(request.getDescription());
    }
    if (request.getCategory() != null) {
      quiz.setCategory(request.getCategory());
    }
    if (request.getDifficulty() != null) {
      quiz.setDifficulty(request.getDifficulty());
    }

    return quizRepository.save(quiz);
  }

  public void deleteQuiz(Long quizId) {
    quizRepository.deleteById(quizId);
  }

  public Question addQuestion(Long quizId, CreateQuestionRequest request) {
    Quiz quiz = quizRepository.findById(quizId)
        .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

    Question question = Question.builder()
        .quiz(quiz)
        .questionText(request.getQuestionText())
        .optionA(request.getOptionA())
        .optionB(request.getOptionB())
        .optionC(request.getOptionC())
        .optionD(request.getOptionD())
        .correctOption(request.getCorrectOption())
        .build();

    return questionRepository.save(question);
  }

  public Question updateQuestion(Long questionId, UpdateQuestionRequest request) {
    Question question = questionRepository.findById(questionId)
        .orElseThrow(() -> new IllegalArgumentException("Question not found"));

    if (request.getQuestionText() != null) {
      question.setQuestionText(request.getQuestionText());
    }
    if (request.getOptionA() != null) {
      question.setOptionA(request.getOptionA());
    }
    if (request.getOptionB() != null) {
      question.setOptionB(request.getOptionB());
    }
    if (request.getOptionC() != null) {
      question.setOptionC(request.getOptionC());
    }
    if (request.getOptionD() != null) {
      question.setOptionD(request.getOptionD());
    }
    if (request.getCorrectOption() != null) {
      question.setCorrectOption(request.getCorrectOption());
    }

    return questionRepository.save(question);
  }

  public void deleteQuestion(Long questionId) {
    questionRepository.deleteById(questionId);
  }
}
