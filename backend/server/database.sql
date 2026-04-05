-- ============================================
-- BubbleTalk — PostgreSQL Schema
-- ============================================


-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY  ,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  password   VARCHAR(50)   NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO users (username, password) VALUES ('testuser', 'testpassword');
-- Indexes
