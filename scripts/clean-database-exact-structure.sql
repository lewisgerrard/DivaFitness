-- Drop all existing tables and start completely fresh
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS body_measurements CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS health_data CASCADE;
DROP TABLE IF EXISTS health_goals CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

-- Drop sequences if they exist
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;
DROP SEQUENCE IF EXISTS emergency_contacts_id_seq CASCADE;
DROP SEQUENCE IF EXISTS body_measurements_id_seq CASCADE;
DROP SEQUENCE IF EXISTS appointments_id_seq CASCADE;

-- 1. Users Table (exact structure as specified)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  address TEXT,
  phone VARCHAR(255),
  date_of_birth DATE,
  photo_url TEXT,
  role VARCHAR(20) CHECK (role IN ('admin', 'client', 'member')) NOT NULL
);

-- 2. Emergency Contacts Table (exact structure as specified)
CREATE TABLE emergency_contacts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  relationship VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  address TEXT
);

-- 3. Body Measurements Table (exact structure as specified)
CREATE TABLE body_measurements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2),
  height_cm DECIMAL(5,2),
  recorded_at DATE NOT NULL
);

-- 4. Appointments Table (exact structure as specified)
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  appointment_type VARCHAR(20) CHECK (appointment_type IN ('1-to-1', 'group', 'nutrition')) NOT NULL,
  appointment_time TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  status VARCHAR(20) CHECK (status IN ('booked', 'paid', 'cancelled', 'completed')) NOT NULL,
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_emergency_contacts_user_id ON emergency_contacts(user_id);
CREATE INDEX idx_body_measurements_user_id ON body_measurements(user_id);
CREATE INDEX idx_body_measurements_recorded_at ON body_measurements(recorded_at);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_time ON appointments(appointment_time);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Insert ONLY Lewis Gerrard as admin user (password: "password")
-- Password hash for "password" using bcrypt
INSERT INTO users (first_name, last_name, email, role) 
VALUES ('Lewis', 'Gerrard', 'lewis.gerrard@outlook.com', 'admin');

-- We need to add the password_hash column since authentication requires it
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);

-- Update Lewis with the password hash for "password"
UPDATE users 
SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email = 'lewis.gerrard@outlook.com';

-- Make password_hash NOT NULL after setting it
ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;
