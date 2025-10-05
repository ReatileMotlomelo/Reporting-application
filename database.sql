-- Create database
CREATE DATABASE university_reporting;

USE university_reporting;

-- Users table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'lecturer', 'prl', 'pl') NOT NULL,
  faculty VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE Courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL UNIQUE,
  lecturer_id INT,
  FOREIGN KEY (lecturer_id) REFERENCES Users(id),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE Classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course_id INT,
  total_students INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES Courses(id),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE Reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lecturer_id INT,
  class_id INT,
  week VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  present_students INT NOT NULL,
  venue VARCHAR(255) NOT NULL,
  time VARCHAR(255) NOT NULL,
  topic TEXT NOT NULL,
  outcomes TEXT NOT NULL,
  recommendations TEXT,
  feedback TEXT,
  status ENUM('submitted', 'reviewed', 'approved') DEFAULT 'submitted',
  FOREIGN KEY (lecturer_id) REFERENCES Users(id),
  FOREIGN KEY (class_id) REFERENCES Classes(id),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Ratings table
CREATE TABLE Ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  target_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Monitoring table
CREATE TABLE Monitoring (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  details TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
