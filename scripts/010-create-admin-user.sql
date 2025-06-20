-- Update the first user to be an admin (replace with your actual email)
UPDATE users 
SET role = 'admin' 
WHERE id = 1;

-- Or create a new admin user if needed (uncomment and modify as needed)
-- INSERT INTO users (first_name, last_name, email, password_hash, role)
-- VALUES ('Admin', 'User', 'admin@example.com', '$2b$10$example_hash', 'admin');
