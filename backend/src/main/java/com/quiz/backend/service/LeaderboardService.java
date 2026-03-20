package com.quiz.backend.service;

import com.quiz.backend.dto.LeaderboardEntry;
import com.quiz.backend.model.Attempt;
import com.quiz.backend.repository.AttemptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {
  private final AttemptRepository attemptRepository;

  public LeaderboardService(AttemptRepository attemptRepository) {
    this.attemptRepository = attemptRepository;
  }

  public List<LeaderboardEntry> getLeaderboard(Long quizId) {
    return attemptRepository.findTop10ByQuizIdOrderByScoreDescTakenAtAsc(quizId).stream()
        .map(this::toEntry)
        .collect(Collectors.toList());
  }

  private LeaderboardEntry toEntry(Attempt attempt) {
    return LeaderboardEntry.builder()
        .username(attempt.getUser().getUsername())
        .college(attempt.getUser().getCollege())
        .score(attempt.getScore())
        .total(attempt.getTotal())
        .build();
  }
}
