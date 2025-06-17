-- Insert sample client data
INSERT INTO clients (name, email, phone, service_interest, status, notes) VALUES
('Sarah Johnson', 'sarah.johnson@example.com', '07123456789', '1-to-1 Personal Training', 'active', 'Beginner, interested in weight loss'),
('Lisa Thompson', 'lisa.thompson@example.com', '07987654321', 'Group Training', 'active', 'Prefers morning sessions'),
('Emma Wilson', 'emma.wilson@example.com', '07555123456', 'Nutrition Coaching', 'consultation', 'Vegetarian, wants meal planning help');

-- Insert sample contact submissions
INSERT INTO contact_submissions (name, email, phone, service, message, status) VALUES
('Rachel Green', 'rachel.green@example.com', '07444555666', 'Free Consultation', 'Hi Emma, I would love to book a free consultation to discuss my fitness goals.', 'new'),
('Michelle Brown', 'michelle.brown@example.com', '07333444555', '1-to-1 Personal Training', 'Looking for personal training sessions. Available weekday evenings.', 'contacted');
