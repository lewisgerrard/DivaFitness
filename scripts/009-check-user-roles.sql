-- Check all users and their roles
SELECT id, email, first_name, last_name, role 
FROM users 
ORDER BY id;

-- Check if there are any admin users
SELECT COUNT(*) as admin_count 
FROM users 
WHERE role = 'admin';

-- Show the first user (likely the one you're using)
SELECT id, email, first_name, last_name, role 
FROM users 
LIMIT 1;
