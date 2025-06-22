-- Convert all members to clients
UPDATE users 
SET role = 'client' 
WHERE role = 'member';

-- Verify the conversion
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role 
ORDER BY role;
