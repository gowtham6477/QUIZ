package com.quiz.backend.repository;

import com.quiz.backend.model.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
  List<Attempt> findTop10ByQuizIdOrderByScoreDescTakenAtAsc(Long quizId);

  boolean existsByUserIdAndQuizId(Long userId, Long quizId);

  List<Attempt> findByUserId(Long userId);
}
