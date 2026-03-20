# Quiz Backend (Spring Boot + MySQL)

This is the backend for the Quiz web app. It provides authentication, quiz APIs, submissions, leaderboards, and admin management endpoints.

## Features
- JWT authentication (register/login)
- Quiz catalog and question retrieval
- Quiz submissions and scoring
- Leaderboards
- Admin CRUD for quizzes and questions

## Requirements
- Java 17+
- Maven 3.9+
- MySQL 8+

## Configure
Edit `src/main/resources/application.yml` to match your MySQL credentials. You can also set env vars:
- `QUIZ_DB_URL` (e.g. `jdbc:mysql://localhost:3306/quizdb`)
- `QUIZ_DB_USER`
- `QUIZ_DB_PASSWORD`
- `QUIZ_JWT_SECRET` (at least 32 chars)
- `QUIZ_ADMIN_EMAIL` (default admin)
- `QUIZ_ADMIN_PASSWORD`
- `QUIZ_GOOGLE_AI_MODEL` (default: `gemini-1.5-flash`)

## Run (local)
```bash
mvn spring-boot:run
```

## Default Admin
At startup, the app creates a default admin if it doesn’t exist. Configure via env vars.

## API Overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/quizzes`
- `GET /api/quizzes/{id}`
- `POST /api/quizzes/{id}/submit`
- `GET /api/leaderboard?quizId=`
- `POST /api/admin/quizzes`
- `PUT /api/admin/quizzes/{id}`
- `DELETE /api/admin/quizzes/{id}`
- `POST /api/admin/quizzes/{id}/questions`
- `PUT /api/admin/questions/{id}`
- `DELETE /api/admin/questions/{id}`
