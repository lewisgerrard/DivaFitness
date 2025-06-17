-- Remove health data and appointment related tables
DROP TABLE IF EXISTS health_data CASCADE;
DROP TABLE IF EXISTS health_goals CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;
DROP TABLE IF EXISTS body_measurements CASCADE;

-- Clean up any remaining references
-- Note: This will remove all health and appointment data permanently
