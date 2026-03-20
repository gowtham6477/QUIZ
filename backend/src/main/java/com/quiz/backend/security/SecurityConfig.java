package com.quiz.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final CustomUserDetailsService userDetailsService;
  private final AuthEntryPoint authEntryPoint;

  public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                        CustomUserDetailsService userDetailsService,
                        AuthEntryPoint authEntryPoint) {
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.userDetailsService = userDetailsService;
    this.authEntryPoint = authEntryPoint;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
    .cors(cors -> {})
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .exceptionHandling(ex -> ex.authenticationEntryPoint(authEntryPoint))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
      .requestMatchers("/api/quizzes/attempts").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/quizzes/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/leaderboard/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder());
    return new ProviderManager(provider);
  }

  @Bean
  public CorsFilter corsFilter(AppCorsProperties props) {
    CorsConfiguration config = new CorsConfiguration();
    String allowedOrigins = props.getAllowedOrigins();
    if (allowedOrigins == null || allowedOrigins.isBlank()) {
      allowedOrigins = "http://localhost:3000";
    }
    config.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
}
