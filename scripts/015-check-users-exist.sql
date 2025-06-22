-- Check if users table exists and what data is in it
SELECT 
    table_name, 
    column_name, 
    data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Check actual user data
SELECT id, first_name, last_name, email, role, created_at 
FROM users 
LIMIT 10;

-- Count total users
SELECT COUNT(*) as total_users FROM users;

-- Count by role
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role;
