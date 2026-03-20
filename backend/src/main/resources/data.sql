INSERT INTO quizzes (id, title, description, category, difficulty, created_at)
VALUES (1, 'General Knowledge', 'A quick warm-up quiz', 'General', 'Easy', NOW())
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO questions (id, quiz_id, question_text, optionA, optionB, optionC, optionD, correct_option)
VALUES (1, 1, 'What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Rome', 'C')
ON DUPLICATE KEY UPDATE question_text = VALUES(question_text);

INSERT INTO questions (id, quiz_id, question_text, optionA, optionB, optionC, optionD, correct_option)
VALUES (2, 1, 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Venus', 'Jupiter', 'B')
ON DUPLICATE KEY UPDATE question_text = VALUES(question_text);
