package com.quiz.backend.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.cors")
public class AppCorsProperties {
  private String allowedOrigins = "http://localhost:3000";

  public String getAllowedOrigins() {
    return allowedOrigins;
  }

  public void setAllowedOrigins(String allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }
}
