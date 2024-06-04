CREATE DATABASE ToDo;
USE ToDo;

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE List (
  list_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  list_title VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  list_id INT NOT NULL,
  task_title VARCHAR(250) NOT NULL,
  task_description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (list_id) REFERENCES List(list_id)
);

CREATE TABLE Reminder (
  reminder_id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  reminder_date DATE NOT NULL,
  FOREIGN KEY (task_id) REFERENCES Task(task_id)
);

CREATE TABLE Tag (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  tag_name VARCHAR(50),
  tag_description TEXT
);

CREATE TABLE Task_Tags (
  task_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (tag_id) REFERENCES Tag(tag_id),
  PRIMARY KEY (task_id, tag_id)
);
