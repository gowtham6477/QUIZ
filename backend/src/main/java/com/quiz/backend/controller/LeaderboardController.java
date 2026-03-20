package com.quiz.backend.controller;

import com.quiz.backend.dto.LeaderboardEntry;
import com.quiz.backend.service.LeaderboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
  private final LeaderboardService leaderboardService;

  public LeaderboardController(LeaderboardService leaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  @GetMapping
  public ResponseEntity<List<LeaderboardEntry>> leaderboard(@RequestParam Long quizId) {
    return ResponseEntity.ok(leaderboardService.getLeaderboard(quizId));
  }
}
