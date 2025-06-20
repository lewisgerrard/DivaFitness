-- Create new combined users table with all profile fields
CREATE TABLE IF NOT EXISTS users_new (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    date_of_birth DATE,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate existing data from users table
INSERT INTO users_new (id, email, password_hash, name, role, created_at, updated_at)
SELECT id, email, password_hash, name, role, created_at, updated_at
FROM users;

-- Migrate existing data from user_profiles table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        UPDATE users_new 
        SET 
            first_name = up.first_name,
            last_name = up.last_name,
            phone = up.phone,
            address = up.address,
            status = up.status,
            date_of_birth = up.date_of_birth,
            emergency_contact_name = up.emergency_contact_name,
            emergency_contact_phone = up.emergency_contact_phone
        FROM user_profiles up
        WHERE users_new.id = up.user_id;
    END IF;
END $$;

-- Drop old tables and rename new one
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
ALTER TABLE users_new RENAME TO users;

-- Update foreign key constraints for other tables
ALTER TABLE health_data DROP CONSTRAINT IF EXISTS health_data_user_id_fkey;
ALTER TABLE health_data ADD CONSTRAINT health_data_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_user_id_fkey;
ALTER TABLE appointments ADD CONSTRAINT appointments_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_trainer_id_fkey;
ALTER TABLE appointments ADD CONSTRAINT appointments_trainer_id_fkey 
    FOREIGN KEY (trainer_id) REFERENCES users(id);

ALTER TABLE health_goals DROP CONSTRAINT IF EXISTS health_goals_user_id_fkey;
ALTER TABLE health_goals ADD CONSTRAINT health_goals_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Reset sequence to current max id
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1));
