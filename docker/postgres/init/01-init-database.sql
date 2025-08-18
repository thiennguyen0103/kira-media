-- =====================================================
-- Kira Media Production Database Schema
-- Version: 1.0.0
-- Created: 2024
-- Description: Comprehensive video editing platform database
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- =====================================================
-- ENUM TYPES
-- =====================================================

-- Media types with comprehensive coverage
CREATE TYPE media_type AS ENUM (
    'video', 'audio', 'image', 'document', 'subtitle', 'effect', 'transition'
);

-- Project status workflow
CREATE TYPE project_status AS ENUM (
    'draft', 'in_progress', 'review', 'approved', 'completed', 'archived', 'deleted'
);

-- User roles with hierarchical permissions
CREATE TYPE user_role AS ENUM (
    'super_admin', 'admin', 'manager', 'editor', 'reviewer', 'viewer', 'guest'
);

-- Media processing status
CREATE TYPE processing_status AS ENUM (
    'pending', 'processing', 'completed', 'failed', 'cancelled'
);

-- License types for media
CREATE TYPE license_type AS ENUM (
    'royalty_free', 'commercial', 'creative_commons', 'custom', 'restricted'
);

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users table with comprehensive profile management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(150),
    role user_role NOT NULL DEFAULT 'viewer',
    avatar_url TEXT,
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT users_username_length CHECK (char_length(username) >= 3),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT users_name_length CHECK (char_length(first_name) >= 1 AND char_length(last_name) >= 1)
);

-- Organizations for team collaboration
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    industry VARCHAR(100),
    size VARCHAR(50),
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT organizations_slug_format CHECK (slug ~* '^[a-z0-9-]+$')
);

-- User organization memberships
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'viewer',
    permissions JSONB DEFAULT '{}',
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    UNIQUE(organization_id, user_id)
);

-- Projects with comprehensive metadata
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    status project_status NOT NULL DEFAULT 'draft',
    thumbnail_url TEXT,
    
    -- Video specifications
    duration_seconds DECIMAL(10,3) DEFAULT 0,
    resolution_width INTEGER,
    resolution_height INTEGER,
    frame_rate DECIMAL(5,2),
    aspect_ratio VARCHAR(20),
    color_space VARCHAR(50),
    
    -- Project metadata
    tags TEXT[],
    category VARCHAR(100),
    difficulty_level VARCHAR(20),
    estimated_hours INTEGER,
    
    -- Ownership and collaboration
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    collaborators JSONB DEFAULT '[]',
    
    -- Settings and preferences
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT projects_slug_format CHECK (slug ~* '^[a-z0-9-]+$'),
    CONSTRAINT projects_duration_positive CHECK (duration_seconds >= 0),
    CONSTRAINT projects_resolution_positive CHECK (resolution_width > 0 AND resolution_height > 0)
);

-- Media library with comprehensive file management
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- File information
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_hash VARCHAR(64) UNIQUE NOT NULL,
    
    -- Media classification
    media_type media_type NOT NULL,
    mime_type VARCHAR(127),
    extension VARCHAR(20),
    
    -- Technical specifications
    duration_seconds DECIMAL(10,3),
    resolution_width INTEGER,
    resolution_height INTEGER,
    frame_rate DECIMAL(5,2),
    bitrate INTEGER,
    codec VARCHAR(100),
    sample_rate INTEGER,
    channels INTEGER,
    
    -- Metadata and thumbnails
    thumbnail_url TEXT,
    preview_url TEXT,
    metadata JSONB DEFAULT '{}',
    exif_data JSONB DEFAULT '{}',
    
    -- Processing and status
    processing_status processing_status DEFAULT 'pending',
    processing_progress INTEGER DEFAULT 0,
    processing_error TEXT,
    
    -- Licensing and rights
    license_type license_type DEFAULT 'royalty_free',
    license_details JSONB DEFAULT '{}',
    copyright_info TEXT,
    
    -- Ownership and organization
    uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT media_file_size_positive CHECK (file_size > 0),
    CONSTRAINT media_duration_positive CHECK (duration_seconds >= 0),
    CONSTRAINT media_resolution_positive CHECK (resolution_width > 0 AND resolution_height > 0)
);

-- Project tracks for timeline management
CREATE TABLE project_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    track_number INTEGER NOT NULL,
    track_type media_type NOT NULL,
    track_name VARCHAR(255),
    track_color VARCHAR(7),
    
    -- Track properties
    is_muted BOOLEAN NOT NULL DEFAULT false,
    is_locked BOOLEAN NOT NULL DEFAULT false,
    is_solo BOOLEAN NOT NULL DEFAULT false,
    volume DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    pan DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    
    -- Track settings
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(project_id, track_number),
    CONSTRAINT project_tracks_volume_range CHECK (volume >= 0 AND volume <= 2),
    CONSTRAINT project_tracks_pan_range CHECK (pan >= -1 AND pan <= 1)
);

-- Project clips (timeline items) with comprehensive properties
CREATE TABLE project_clips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    track_id UUID NOT NULL REFERENCES project_tracks(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE RESTRICT,
    
    -- Timeline positioning
    start_time_seconds DECIMAL(10,3) NOT NULL,
    end_time_seconds DECIMAL(10,3) NOT NULL,
    clip_start_seconds DECIMAL(10,3) DEFAULT 0,
    clip_end_seconds DECIMAL(10,3),
    
    -- Visual properties
    volume DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    opacity DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    rotation_degrees DECIMAL(5,2) DEFAULT 0,
    scale_x DECIMAL(5,2) DEFAULT 1.0,
    scale_y DECIMAL(5,2) DEFAULT 1.0,
    position_x DECIMAL(10,3) DEFAULT 0,
    position_y DECIMAL(10,3) DEFAULT 0,
    
    -- Advanced properties
    blend_mode VARCHAR(50) DEFAULT 'normal',
    speed_factor DECIMAL(3,2) DEFAULT 1.0,
    reverse BOOLEAN DEFAULT false,
    
    -- Effects and metadata
    effects JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT project_clips_time_order CHECK (start_time_seconds < end_time_seconds),
    CONSTRAINT project_clips_volume_range CHECK (volume >= 0 AND volume <= 2),
    CONSTRAINT project_clips_opacity_range CHECK (opacity >= 0 AND opacity <= 1),
    CONSTRAINT project_clips_scale_positive CHECK (scale_x > 0 AND scale_y > 0)
);

-- Effects library with comprehensive parameters
CREATE TABLE effects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    
    -- Effect parameters
    parameters_schema JSONB NOT NULL DEFAULT '{}',
    default_values JSONB DEFAULT '{}',
    parameter_constraints JSONB DEFAULT '{}',
    
    -- Effect properties
    is_preset BOOLEAN NOT NULL DEFAULT false,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    difficulty_level VARCHAR(20),
    processing_complexity INTEGER DEFAULT 1,
    
    -- Ownership and licensing
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    license_type license_type DEFAULT 'royalty_free',
    
    -- Metadata
    tags TEXT[],
    preview_url TEXT,
    documentation_url TEXT,
    version VARCHAR(20) DEFAULT '1.0.0',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT effects_slug_format CHECK (slug ~* '^[a-z0-9-]+$'),
    CONSTRAINT effects_processing_complexity_range CHECK (processing_complexity >= 1 AND processing_complexity <= 10)
);

-- Applied effects to clips
CREATE TABLE clip_effects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clip_id UUID NOT NULL REFERENCES project_clips(id) ON DELETE CASCADE,
    effect_id UUID NOT NULL REFERENCES effects(id) ON DELETE CASCADE,
    
    -- Effect application
    parameters JSONB NOT NULL DEFAULT '{}',
    start_time_seconds DECIMAL(10,3) DEFAULT 0,
    end_time_seconds DECIMAL(10,3),
    
    -- Effect properties
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    order_index INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT clip_effects_time_order CHECK (start_time_seconds < end_time_seconds OR end_time_seconds IS NULL)
);

-- Transitions library
CREATE TABLE transitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Transition properties
    duration_seconds DECIMAL(5,3) NOT NULL DEFAULT 1.0,
    parameters_schema JSONB NOT NULL DEFAULT '{}',
    default_values JSONB DEFAULT '{}',
    
    -- Visual properties
    preview_url TEXT,
    thumbnail_url TEXT,
    
    -- Metadata
    is_preset BOOLEAN NOT NULL DEFAULT false,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    tags TEXT[],
    difficulty_level VARCHAR(20),
    
    -- Ownership
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT transitions_slug_format CHECK (slug ~* '^[a-z0-9-]+$'),
    CONSTRAINT transitions_duration_positive CHECK (duration_seconds > 0)
);

-- Applied transitions between clips
CREATE TABLE clip_transitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    from_clip_id UUID REFERENCES project_clips(id) ON DELETE CASCADE,
    to_clip_id UUID REFERENCES project_clips(id) ON DELETE CASCADE,
    transition_id UUID NOT NULL REFERENCES transitions(id) ON DELETE CASCADE,
    
    -- Transition properties
    parameters JSONB DEFAULT '{}',
    duration_seconds DECIMAL(5,3) NOT NULL,
    start_time_seconds DECIMAL(10,3) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT clip_transitions_duration_positive CHECK (duration_seconds > 0)
);

-- Project settings and preferences
CREATE TABLE project_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Video settings
    video_settings JSONB NOT NULL DEFAULT '{}',
    audio_settings JSONB NOT NULL DEFAULT '{}',
    export_settings JSONB NOT NULL DEFAULT '{}',
    
    -- Timeline settings
    timeline_settings JSONB NOT NULL DEFAULT '{}',
    playback_settings JSONB NOT NULL DEFAULT '{}',
    
    -- Collaboration settings
    collaboration_settings JSONB NOT NULL DEFAULT '{}',
    sharing_settings JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User preferences and settings
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Interface preferences
    ui_preferences JSONB NOT NULL DEFAULT '{}',
    editor_preferences JSONB NOT NULL DEFAULT '{}',
    timeline_preferences JSONB NOT NULL DEFAULT '{}',
    
    -- Performance preferences
    performance_settings JSONB NOT NULL DEFAULT '{}',
    quality_settings JSONB NOT NULL DEFAULT '{}',
    
    -- Notification preferences
    notification_preferences JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_username ON users(username) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_organization ON users(id) WHERE organization_id IS NOT NULL;
CREATE INDEX idx_users_created_at ON users(created_at) WHERE deleted_at IS NULL;

-- Projects table indexes
CREATE INDEX idx_projects_slug ON projects(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_created_by ON projects(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_organization ON projects(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_created_at ON projects(created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_tags ON projects USING GIN(tags) WHERE deleted_at IS NULL;

-- Media table indexes
CREATE INDEX idx_media_filename ON media(filename) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_type ON media(media_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_organization ON media(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_project ON media(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_processing_status ON media(processing_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_created_at ON media(created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_file_hash ON media(file_hash) WHERE deleted_at IS NULL;

-- Project tracks indexes
CREATE INDEX idx_project_tracks_project ON project_tracks(project_id);
CREATE INDEX idx_project_tracks_number ON project_tracks(project_id, track_number);

-- Project clips indexes
CREATE INDEX idx_project_clips_project ON project_clips(project_id);
CREATE INDEX idx_project_clips_track ON project_clips(track_id);
CREATE INDEX idx_project_clips_media ON project_clips(media_id);
CREATE INDEX idx_project_clips_time ON project_clips(project_id, start_time_seconds, end_time_seconds);

-- Effects indexes
CREATE INDEX idx_effects_slug ON effects(slug);
CREATE INDEX idx_effects_category ON effects(category);
CREATE INDEX idx_effects_created_by ON effects(created_by);
CREATE INDEX idx_effects_tags ON effects USING GIN(tags);

-- Transitions indexes
CREATE INDEX idx_transitions_slug ON transitions(slug);
CREATE INDEX idx_transitions_category ON transitions(category);

-- Full-text search indexes
CREATE INDEX idx_projects_search ON projects USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_media_search ON media USING GIN(to_tsvector('english', filename || ' ' || COALESCE(original_filename, '')));
CREATE INDEX idx_effects_search ON effects USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(input_text, '[^a-zA-Z0-9\s-]', '', 'g'));
END;
$$ language 'plpgsql';

-- Function to calculate clip duration
CREATE OR REPLACE FUNCTION calculate_clip_duration(clip_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    duration DECIMAL;
BEGIN
    SELECT (end_time_seconds - start_time_seconds) INTO duration
    FROM project_clips
    WHERE id = clip_id;
    
    RETURN COALESCE(duration, 0);
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_tracks_updated_at BEFORE UPDATE ON project_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_clips_updated_at BEFORE UPDATE ON project_clips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_effects_updated_at BEFORE UPDATE ON effects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transitions_updated_at BEFORE UPDATE ON transitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_settings_updated_at BEFORE UPDATE ON project_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert default super admin user
INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_verified) 
VALUES (
    'admin', 
    'admin@kiramedia.com', 
    '$2b$10$default_hash_placeholder_change_in_production', 
    'Super', 
    'Admin', 
    'super_admin', 
    true
);

-- Insert sample effects
INSERT INTO effects (name, slug, category, description, parameters_schema, is_preset) VALUES
('Brightness Adjustment', 'brightness-adjustment', 'adjustment', 'Adjust video brightness levels', '{"brightness": {"type": "number", "min": -100, "max": 100, "default": 0}}', true),
('Contrast Enhancement', 'contrast-enhancement', 'adjustment', 'Enhance video contrast', '{"contrast": {"type": "number", "min": 0, "max": 200, "default": 100}}', true),
('Gaussian Blur', 'gaussian-blur', 'filter', 'Apply Gaussian blur effect', '{"radius": {"type": "number", "min": 0, "max": 100, "default": 10}}', true),
('Sharpen', 'sharpen', 'filter', 'Sharpen video details', '{"amount": {"type": "number", "min": 0, "max": 100, "default": 50}}', true),
('Color Balance', 'color-balance', 'adjustment', 'Adjust color balance', '{"red": {"type": "number", "min": -100, "max": 100, "default": 0}, "green": {"type": "number", "min": -100, "max": 100, "default": 0}, "blue": {"type": "number", "min": -100, "max": 100, "default": 0}}', true);

-- Insert sample transitions
INSERT INTO transitions (name, slug, category, description, duration_seconds, is_preset) VALUES
('Fade In', 'fade-in', 'fade', 'Smooth fade in transition', 1.0, true),
('Fade Out', 'fade-out', 'fade', 'Smooth fade out transition', 1.0, true),
('Cross Dissolve', 'cross-dissolve', 'dissolve', 'Classic cross dissolve transition', 1.5, true),
('Slide Left', 'slide-left', 'slide', 'Slide transition to the left', 1.0, true),
('Slide Right', 'slide-right', 'slide', 'Slide transition to the right', 1.0, true),
('Zoom In', 'zoom-in', 'zoom', 'Zoom in transition effect', 1.2, true),
('Zoom Out', 'zoom-out', 'zoom', 'Zoom out transition effect', 1.2, true);

-- =====================================================
-- PERMISSIONS
-- =====================================================

-- Grant permissions to application user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO kira_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO kira_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO kira_user;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE users IS 'User accounts with comprehensive profile management and role-based access control';
COMMENT ON TABLE organizations IS 'Organizations for team collaboration and project management';
COMMENT ON TABLE projects IS 'Video editing projects with comprehensive metadata and specifications';
COMMENT ON TABLE media IS 'Media library with comprehensive file management and processing status';
COMMENT ON TABLE project_tracks IS 'Timeline tracks for organizing media clips in projects';
COMMENT ON TABLE project_clips IS 'Individual media clips positioned on timeline tracks with visual properties';
COMMENT ON TABLE effects IS 'Video effects library with parameter schemas and constraints';
COMMENT ON TABLE transitions IS 'Transition effects for smooth scene changes';
COMMENT ON TABLE project_settings IS 'Project-specific settings and configuration';
COMMENT ON TABLE user_preferences IS 'User-specific preferences and interface settings';

COMMENT ON COLUMN users.role IS 'Hierarchical user role system for access control';
COMMENT ON COLUMN projects.status IS 'Project workflow status from draft to completed';
COMMENT ON COLUMN media.processing_status IS 'Media processing pipeline status';
COMMENT ON COLUMN media.license_type IS 'Licensing information for media usage rights';
COMMENT ON COLUMN project_clips.effects IS 'JSON array of applied effects with parameters';
COMMENT ON COLUMN effects.parameters_schema IS 'JSON schema defining effect parameters and constraints';
