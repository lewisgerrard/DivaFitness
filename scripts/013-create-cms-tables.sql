-- Create CMS content management tables
CREATE TABLE IF NOT EXISTS cms_pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meta_description TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cms_sections (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cms_media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text TEXT,
  caption TEXT,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cms_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(20) DEFAULT 'text' CHECK (setting_type IN ('text', 'number', 'boolean', 'json', 'image')),
  description TEXT,
  category VARCHAR(50) DEFAULT 'general',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INTEGER REFERENCES users(id)
);

-- Insert default CMS settings
INSERT INTO cms_settings (setting_key, setting_value, setting_type, description, category) VALUES
('site_title', 'Diva Fitness', 'text', 'Main site title', 'general'),
('site_tagline', 'Transform Your Fitness Journey', 'text', 'Site tagline/subtitle', 'general'),
('contact_email', 'info@diva-fitness.co.uk', 'text', 'Main contact email', 'contact'),
('contact_phone', '07966 874 821', 'text', 'Main contact phone', 'contact'),
('business_address', 'Chester, UK', 'text', 'Business address', 'contact'),
('hero_background_image', '/images/studio-exterior-full.jpg', 'image', 'Hero section background image', 'homepage'),
('about_description', 'Empowering women since 2017 with personalised fitness journeys that transform bodies, minds, and lives.', 'text', 'About section description', 'homepage')
ON CONFLICT (setting_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON cms_pages(status);
CREATE INDEX IF NOT EXISTS idx_cms_sections_page_id ON cms_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_cms_sections_order ON cms_sections(section_order);
CREATE INDEX IF NOT EXISTS idx_cms_settings_key ON cms_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_cms_settings_category ON cms_settings(category);
