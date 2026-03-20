package com.quiz.backend.service;

import com.quiz.backend.dto.AnswerSubmission;
import com.quiz.backend.dto.SubmitQuizRequest;
import com.quiz.backend.dto.SubmitQuizResponse;
import com.quiz.backend.model.Answer;
import com.quiz.backend.model.Attempt;
import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.model.User;
import com.quiz.backend.repository.AnswerRepository;
import com.quiz.backend.repository.AttemptRepository;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttemptService {
  private final QuizRepository quizRepository;
  private final QuestionRepository questionRepository;
  private final AttemptRepository attemptRepository;
  private final AnswerRepository answerRepository;
  private final UserRepository userRepository;

  public AttemptService(QuizRepository quizRepository,
                        QuestionRepository questionRepository,
                        AttemptRepository attemptRepository,
                        AnswerRepository answerRepository,
                        UserRepository userRepository) {
    this.quizRepository = quizRepository;
    this.questionRepository = questionRepository;
    this.attemptRepository = attemptRepository;
    this.answerRepository = answerRepository;
    this.userRepository = userRepository;
  }

  public SubmitQuizResponse submitQuiz(String email, Long quizId, SubmitQuizRequest request) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Quiz quiz = quizRepository.findById(quizId)
        .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

    if (attemptRepository.existsByUserIdAndQuizId(user.getId(), quizId)) {
      throw new IllegalArgumentException("Quiz already attempted");
    }

    List<Question> questions = questionRepository.findByQuizId(quizId);
    Map<Long, Question> questionMap = questions.stream()
        .collect(Collectors.toMap(Question::getId, q -> q));

    int score = 0;
    Map<Long, String> correctAnswers = new HashMap<>();

    for (Question question : questions) {
      correctAnswers.put(question.getId(), question.getCorrectOption());
    }

    Attempt attempt = Attempt.builder()
        .user(user)
        .quiz(quiz)
        .score(0)
        .total(questions.size())
        .takenAt(Instant.now())
        .build();

    attemptRepository.save(attempt);

    List<AnswerSubmission> submissions = request.getAnswers();
    if (submissions == null) {
      submissions = List.of();
    }

    for (AnswerSubmission submission : submissions) {
      Question question = questionMap.get(submission.getQuestionId());
      if (question == null) {
        continue;
      }
      boolean isCorrect = question.getCorrectOption().equalsIgnoreCase(submission.getSelectedOption());
      if (isCorrect) {
        score++;
      }

      Answer answer = Answer.builder()
          .attempt(attempt)
          .question(question)
          .selectedOption(submission.getSelectedOption())
          .correct(isCorrect)
          .build();
      answerRepository.save(answer);
    }

    attempt.setScore(score);
    attemptRepository.save(attempt);

    return SubmitQuizResponse.builder()
        .score(score)
        .total(questions.size())
        .correctAnswers(correctAnswers)
        .build();
  }

  public List<Long> getAttemptedQuizIds(String email) {
    User user = userRepository.findByEmail(email).orElse(null);
    if (user == null) {
      return List.of();
    }
    return attemptRepository.findByUserId(user.getId()).stream()
        .map(attempt -> attempt.getQuiz().getId())
        .distinct()
        .collect(Collectors.toList());
  }
}
