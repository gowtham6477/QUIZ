package com.quiz.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@EnabledIfEnvironmentVariable(named = "QUIZ_DB_URL", matches = ".+")
class QuizBackendApplicationTests {
  @Test
  void contextLoads() {
  }
}
