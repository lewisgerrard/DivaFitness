-- Create branding settings table
CREATE TABLE IF NOT EXISTS branding_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) NOT NULL DEFAULT 'string',
  category VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default branding values
INSERT INTO branding_settings (setting_key, setting_value, setting_type, category, description) VALUES
-- Colors
('primary_color', '#7b329b', 'color', 'colors', 'Main brand color used for buttons, links, and primary elements'),
('primary_dark', '#5a1a75', 'color', 'colors', 'Darker shade of primary color for hover states'),
('accent_light', '#e879f9', 'color', 'colors', 'Light accent color for highlights and decorative elements'),
('background_light', '#f9fafb', 'color', 'colors', 'Light background color for sections'),
('text_primary', '#111827', 'color', 'colors', 'Primary text color for headings'),
('text_secondary', '#4b5563', 'color', 'colors', 'Secondary text color for body content'),

-- Typography
('heading_font', 'Inter', 'string', 'typography', 'Font family for headings'),
('body_font', 'Inter', 'string', 'typography', 'Font family for body text'),
('base_font_size', '16', 'number', 'typography', 'Base font size in pixels'),

-- Spacing
('section_padding', '48', 'number', 'spacing', 'Section padding in pixels'),
('card_padding', '24', 'number', 'spacing', 'Card padding in pixels'),
('border_radius', '12', 'number', 'spacing', 'Border radius in pixels'),

-- Components
('button_style', 'rounded', 'string', 'components', 'Button border radius style'),
('shadow_style', 'lg', 'string', 'components', 'Default shadow style for cards'),
('transition_duration', '300', 'number', 'components', 'Animation transition duration in milliseconds')

ON CONFLICT (setting_key) DO NOTHING;
