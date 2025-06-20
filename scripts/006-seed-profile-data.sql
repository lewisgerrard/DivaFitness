-- Insert sample user profiles
INSERT INTO user_profiles (user_id, first_name, last_name, phone, address, status, date_of_birth, emergency_contact_name, emergency_contact_phone) VALUES
(1, 'Emma', 'Fisher', '07966874821', 'Chester, UK', 'active', '1985-06-15', 'John Fisher', '07123456789'),
(2, 'Sarah', 'Johnson', '07123456789', '123 Main Street, Chester, CH1 1AB', 'active', '1990-03-22', 'Mike Johnson', '07987654321')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample health data
INSERT INTO health_data (user_id, measurement_date, weight_kg, height_cm, body_fat_percentage, muscle_mass_kg, bmi, resting_heart_rate, blood_pressure_systolic, blood_pressure_diastolic, notes) VALUES
(2, '2024-01-15', 65.5, 165, 22.5, 45.2, 24.1, 68, 120, 80, 'Baseline measurements'),
(2, '2024-02-15', 64.8, 165, 21.8, 45.8, 23.8, 65, 118, 78, 'Good progress after 1 month'),
(2, '2024-03-15', 64.2, 165, 21.2, 46.5, 23.6, 62, 115, 75, 'Excellent improvements');

-- Insert sample appointments
INSERT INTO appointments (user_id, trainer_id, appointment_date, appointment_time, duration_minutes, service_type, status, notes) VALUES
(2, 1, '2024-12-20', '10:00:00', 60, '1-to-1 Personal Training', 'scheduled', 'Focus on strength training'),
(2, 1, '2024-12-22', '14:00:00', 60, '1-to-1 Personal Training', 'scheduled', 'Cardio and flexibility'),
(2, 1, '2024-12-27', '09:00:00', 90, 'Nutrition Coaching', 'scheduled', 'Meal planning session'),
(2, 1, '2024-12-15', '10:00:00', 60, '1-to-1 Personal Training', 'completed', 'Great session, good form'),
(2, 1, '2024-12-10', '14:00:00', 60, '1-to-1 Personal Training', 'completed', 'Focused on lower body');

-- Insert sample health goals
INSERT INTO health_goals (user_id, goal_type, target_value, current_value, target_date, status, description) VALUES
(2, 'Weight Loss', 62.0, 64.2, '2024-06-01', 'active', 'Lose 2kg by summer'),
(2, 'Body Fat Percentage', 20.0, 21.2, '2024-05-01', 'active', 'Reduce body fat to 20%'),
(2, 'Strength Training', 50.0, 35.0, '2024-04-01', 'active', 'Bench press 50kg');
