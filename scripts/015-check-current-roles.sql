-- Check what roles currently exist in the database
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role 
ORDER BY role;
