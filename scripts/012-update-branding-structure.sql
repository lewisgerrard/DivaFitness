-- Drop existing branding table and recreate with proper structure
DROP TABLE IF EXISTS branding_settings;

-- Create comprehensive branding settings table
CREATE TABLE branding_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(20) NOT NULL DEFAULT 'text',
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  description TEXT,
  css_variable VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert comprehensive design tokens
INSERT INTO branding_settings (setting_key, setting_value, setting_type, category, subcategory, description, css_variable, display_order) VALUES

-- 1. COLOURS - Brand Colours
('color_primary', '#D1235B', 'color', 'colours', 'brand', 'Primary brand color', '--color-primary', 1),
('color_secondary', '#292F36', 'color', 'colours', 'brand', 'Secondary brand color', '--color-secondary', 2),
('color_accent', '#F5A623', 'color', 'colours', 'brand', 'Accent color for highlights', '--color-accent', 3),

-- Greyscale
('color_black', '#000000', 'color', 'colours', 'greyscale', 'Pure black', '--color-black', 4),
('color_dark_grey', '#333333', 'color', 'colours', 'greyscale', 'Dark grey for text', '--color-dark-grey', 5),
('color_grey', '#888888', 'color', 'colours', 'greyscale', 'Medium grey', '--color-grey', 6),
('color_light_grey', '#E0E0E0', 'color', 'colours', 'greyscale', 'Light grey for borders', '--color-light-grey', 7),
('color_white', '#FFFFFF', 'color', 'colours', 'greyscale', 'Pure white', '--color-white', 8),

-- Status Colours
('color_success', '#28a745', 'color', 'colours', 'status', 'Success state color', '--color-success', 9),
('color_warning', '#ffc107', 'color', 'colours', 'status', 'Warning state color', '--color-warning', 10),
('color_error', '#dc3545', 'color', 'colours', 'status', 'Error state color', '--color-error', 11),
('color_info', '#17a2b8', 'color', 'colours', 'status', 'Info state color', '--color-info', 12),

-- 2. TYPOGRAPHY - Font Families
('font_primary', 'Inter, sans-serif', 'text', 'typography', 'families', 'Primary font family', '--font-primary', 13),
('font_secondary', 'Playfair Display, serif', 'text', 'typography', 'families', 'Secondary font family for headings', '--font-secondary', 14),

-- Font Sizes
('font_size_xs', '12', 'number', 'typography', 'sizes', 'Extra small font size (px)', '--font-size-xs', 15),
('font_size_sm', '14', 'number', 'typography', 'sizes', 'Small font size (px)', '--font-size-sm', 16),
('font_size_base', '16', 'number', 'typography', 'sizes', 'Base font size (px)', '--font-size-base', 17),
('font_size_md', '18', 'number', 'typography', 'sizes', 'Medium font size (px)', '--font-size-md', 18),
('font_size_lg', '24', 'number', 'typography', 'sizes', 'Large font size (px)', '--font-size-lg', 19),
('font_size_xl', '32', 'number', 'typography', 'sizes', 'Extra large font size (px)', '--font-size-xl', 20),
('font_size_xxl', '48', 'number', 'typography', 'sizes', 'Extra extra large font size (px)', '--font-size-xxl', 21),

-- Font Weights
('font_weight_light', '300', 'number', 'typography', 'weights', 'Light font weight', '--font-weight-light', 22),
('font_weight_regular', '400', 'number', 'typography', 'weights', 'Regular font weight', '--font-weight-regular', 23),
('font_weight_medium', '500', 'number', 'typography', 'weights', 'Medium font weight', '--font-weight-medium', 24),
('font_weight_bold', '700', 'number', 'typography', 'weights', 'Bold font weight', '--font-weight-bold', 25),

-- Line Heights
('line_height_base', '1.5', 'number', 'typography', 'line-heights', 'Base line height', '--line-height-base', 26),
('line_height_tight', '1.2', 'number', 'typography', 'line-heights', 'Tight line height for headings', '--line-height-tight', 27),
('line_height_loose', '1.8', 'number', 'typography', 'line-heights', 'Loose line height for readability', '--line-height-loose', 28),

-- 3. SPACING
('spacing_xs', '4', 'number', 'spacing', 'padding-margin', 'Extra small spacing (px)', '--spacing-xs', 29),
('spacing_sm', '8', 'number', 'spacing', 'padding-margin', 'Small spacing (px)', '--spacing-sm', 30),
('spacing_md', '16', 'number', 'spacing', 'padding-margin', 'Medium spacing (px)', '--spacing-md', 31),
('spacing_lg', '24', 'number', 'spacing', 'padding-margin', 'Large spacing (px)', '--spacing-lg', 32),
('spacing_xl', '32', 'number', 'spacing', 'padding-margin', 'Extra large spacing (px)', '--spacing-xl', 33),
('spacing_xxl', '64', 'number', 'spacing', 'padding-margin', 'Extra extra large spacing (px)', '--spacing-xxl', 34),

-- 4. CONTAINER & LAYOUT
('max_width', '1200', 'number', 'layout', 'container', 'Maximum container width (px)', '--max-width', 35),
('gutter_width', '24', 'number', 'layout', 'container', 'Grid gutter width (px)', '--gutter-width', 36),
('grid_columns', '12', 'number', 'layout', 'container', 'Number of grid columns', '--grid-columns', 37),
('section_padding', '80', 'number', 'layout', 'container', 'Default section padding (px)', '--section-padding', 38),

-- 5. BORDER RADIUS
('radius_sm', '4', 'number', 'border-radius', 'corners', 'Small border radius (px)', '--radius-sm', 39),
('radius_md', '8', 'number', 'border-radius', 'corners', 'Medium border radius (px)', '--radius-md', 40),
('radius_lg', '16', 'number', 'border-radius', 'corners', 'Large border radius (px)', '--radius-lg', 41),
('radius_full', '9999', 'number', 'border-radius', 'corners', 'Full border radius for pills/circles (px)', '--radius-full', 42),

-- 6. SHADOWS
('shadow_sm', '0 1px 3px rgba(0,0,0,0.1)', 'text', 'shadows', 'elevation', 'Small shadow', '--shadow-sm', 43),
('shadow_md', '0 4px 6px rgba(0,0,0,0.1)', 'text', 'shadows', 'elevation', 'Medium shadow', '--shadow-md', 44),
('shadow_lg', '0 10px 20px rgba(0,0,0,0.15)', 'text', 'shadows', 'elevation', 'Large shadow', '--shadow-lg', 45),

-- 7. TRANSITIONS
('transition_default', 'all 0.3s ease', 'text', 'transitions', 'timing', 'Default transition', '--transition-default', 46),
('transition_fast', 'all 0.15s ease-in-out', 'text', 'transitions', 'timing', 'Fast transition', '--transition-fast', 47);

-- Create index for better performance
CREATE INDEX idx_branding_category ON branding_settings(category, subcategory, display_order);
CREATE INDEX idx_branding_css_variable ON branding_settings(css_variable);
