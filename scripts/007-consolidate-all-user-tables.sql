-- Create the new consolidated users table with all fields
CREATE TABLE IF NOT EXISTS users_consolidated (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'client', 'member')),
    
    -- Profile fields
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    
    -- Client-specific fields
    service_interest VARCHAR(255),
    notes TEXT,
    
    -- Status and metadata
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate data from existing users table
INSERT INTO users_consolidated (
    id, email, password_hash, name, role, first_name, last_name, phone, address, 
    date_of_birth, emergency_contact_name, emergency_contact_phone, status, created_at, updated_at
)
SELECT 
    id, email, password_hash, name, role, 
    first_name, last_name, phone, address, 
    date_of_birth, emergency_contact_name, emergency_contact_phone, 
    COALESCE(status, 'active'), created_at, updated_at
FROM users
ON CONFLICT (email) DO NOTHING;

-- Migrate data from user_profiles table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        -- Update existing users with profile data
        UPDATE users_consolidated 
        SET 
            first_name = COALESCE(users_consolidated.first_name, up.first_name),
            last_name = COALESCE(users_consolidated.last_name, up.last_name),
            phone = COALESCE(users_consolidated.phone, up.phone),
            address = COALESCE(users_consolidated.address, up.address),
            date_of_birth = COALESCE(users_consolidated.date_of_birth, up.date_of_birth),
            emergency_contact_name = COALESCE(users_consolidated.emergency_contact_name, up.emergency_contact_name),
            emergency_contact_phone = COALESCE(users_consolidated.emergency_contact_phone, up.emergency_contact_phone),
            status = COALESCE(users_consolidated.status, up.status, 'active')
        FROM user_profiles up
        WHERE users_consolidated.id = up.user_id;
        
        -- Insert users that only exist in user_profiles (shouldn't happen but just in case)
        INSERT INTO users_consolidated (
            email, password_hash, name, role, first_name, last_name, phone, address,
            date_of_birth, emergency_contact_name, emergency_contact_phone, status
        )
        SELECT 
            COALESCE(up.email, 'unknown_' || up.user_id || '@example.com'),
            'temp_password_hash',
            COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User'),
            'user',
            up.first_name, up.last_name, up.phone, up.address,
            up.date_of_birth, up.emergency_contact_name, up.emergency_contact_phone,
            COALESCE(up.status, 'active')
        FROM user_profiles up
        LEFT JOIN users_consolidated uc ON uc.id = up.user_id
        WHERE uc.id IS NULL
        ON CONFLICT (email) DO NOTHING;
    END IF;
END $$;

-- Migrate data from clients table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'clients') THEN
        -- Insert clients as users with role 'client'
        INSERT INTO users_consolidated (
            email, password_hash, name, role, phone, service_interest, notes, status, created_at
        )
        SELECT 
            email,
            COALESCE(password_hash, crypt('temp_password_' || id, gen_salt('bf'))),
            name,
            'client',
            phone,
            service_interest,
            notes,
            COALESCE(status, 'active'),
            created_at
        FROM clients
        ON CONFLICT (email) DO UPDATE SET
            role = CASE WHEN users_consolidated.role = 'admin' THEN 'admin' ELSE 'client' END,
            phone = COALESCE(users_consolidated.phone, EXCLUDED.phone),
            service_interest = COALESCE(users_consolidated.service_interest, EXCLUDED.service_interest),
            notes = COALESCE(users_consolidated.notes, EXCLUDED.notes);
    END IF;
END $$;

-- Migrate data from admin_users table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admin_users') THEN
        -- Insert admin users
        INSERT INTO users_consolidated (
            email, password_hash, name, role, created_at
        )
        SELECT 
            email,
            password_hash,
            COALESCE(name, email),
            'admin',
            created_at
        FROM admin_users
        ON CONFLICT (email) DO UPDATE SET
            role = 'admin',
            password_hash = EXCLUDED.password_hash;
    END IF;
END $$;

-- Update foreign key constraints for related tables
-- Health data
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'health_data') THEN
        ALTER TABLE health_data DROP CONSTRAINT IF EXISTS health_data_user_id_fkey;
        ALTER TABLE health_data ADD CONSTRAINT health_data_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES users_consolidated(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Appointments
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'appointments') THEN
        ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_user_id_fkey;
        ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_trainer_id_fkey;
        ALTER TABLE appointments ADD CONSTRAINT appointments_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES users_consolidated(id) ON DELETE CASCADE;
        ALTER TABLE appointments ADD CONSTRAINT appointments_trainer_id_fkey 
            FOREIGN KEY (trainer_id) REFERENCES users_consolidated(id);
    END IF;
END $$;

-- Health goals
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'health_goals') THEN
        ALTER TABLE health_goals DROP CONSTRAINT IF EXISTS health_goals_user_id_fkey;
        ALTER TABLE health_goals ADD CONSTRAINT health_goals_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES users_consolidated(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Drop old tables (be careful with this in production!)
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Rename the consolidated table to users
ALTER TABLE users_consolidated RENAME TO users;

-- Reset sequence to current max id
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
