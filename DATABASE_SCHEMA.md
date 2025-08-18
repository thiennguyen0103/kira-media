# 🗄️ Kira Media Database Schema Documentation

## 📋 Overview

This document describes the comprehensive, production-ready database schema for the Kira Media video editing platform. The schema follows industry best practices and is designed for scalability, performance, and maintainability.

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅

## 🏗️ Architecture Principles

### **1. Design Philosophy**
- **Normalized Structure**: Proper 3NF normalization for data integrity
- **Scalable Design**: UUID primary keys for distributed systems
- **Performance First**: Strategic indexing and query optimization
- **Future-Proof**: Flexible JSONB fields for evolving requirements
- **Security Focus**: Role-based access control and data validation

### **2. Naming Conventions**
- **Tables**: `snake_case`, descriptive names (e.g., `project_clips`)
- **Columns**: `snake_case`, clear and specific (e.g., `start_time_seconds`)
- **Indexes**: `idx_tablename_columnname` pattern
- **Constraints**: Descriptive names for complex constraints
- **Functions**: `verb_noun` pattern (e.g., `generate_slug`)

### **3. Data Types Strategy**
- **UUIDs**: Primary keys for scalability and security
- **JSONB**: Flexible metadata storage with query capabilities
- **ENUMs**: Strict validation for status and type fields
- **DECIMAL**: Precise time and measurement values
- **TEXT**: Unlimited length for descriptions and metadata

## 📊 Core Tables Structure

### **1. User Management System**

#### **`users` Table**
```sql
-- Core user information with comprehensive profile management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(150),
    role user_role NOT NULL DEFAULT 'viewer',
    -- ... additional fields
);
```

**Key Features**:
- **Role Hierarchy**: 7-tier role system (super_admin → guest)
- **Profile Management**: Comprehensive user profiles with preferences
- **Security**: Email verification, login tracking, soft deletes
- **Validation**: Email format, username length, name requirements

#### **`organizations` Table**
```sql
-- Team collaboration and project organization
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    -- ... additional fields
);
```

**Key Features**:
- **Slug System**: SEO-friendly URLs and routing
- **Team Management**: Organization-based collaboration
- **Industry Classification**: Business categorization
- **Settings**: Flexible configuration storage

#### **`organization_members` Table**
```sql
-- User membership and permissions within organizations
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID NOT NULL REFERENCES users(id),
    role user_role NOT NULL DEFAULT 'viewer',
    permissions JSONB DEFAULT '{}',
    -- ... additional fields
);
```

**Key Features**:
- **Flexible Permissions**: JSONB-based permission system
- **Role Inheritance**: Organization-level role assignments
- **Active Status**: Member activation/deactivation tracking

### **2. Project Management System**

#### **`projects` Table**
```sql
-- Video editing projects with comprehensive metadata
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    status project_status NOT NULL DEFAULT 'draft',
    -- Video specifications
    duration_seconds DECIMAL(10,3) DEFAULT 0,
    resolution_width INTEGER,
    resolution_height INTEGER,
    frame_rate DECIMAL(5,2),
    -- ... additional fields
);
```

**Key Features**:
- **Workflow Status**: 7-stage project lifecycle
- **Video Specifications**: Comprehensive technical metadata
- **Collaboration**: Multi-user project access
- **Categorization**: Tags, difficulty levels, estimated time

#### **`project_tracks` Table**
```sql
-- Timeline tracks for organizing media clips
CREATE TABLE project_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id),
    track_number INTEGER NOT NULL,
    track_type media_type NOT NULL,
    -- Track properties
    is_muted BOOLEAN NOT NULL DEFAULT false,
    is_locked BOOLEAN NOT NULL DEFAULT false,
    volume DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    -- ... additional fields
);
```

**Key Features**:
- **Track Organization**: Numbered track system
- **Audio/Video Support**: Different track types
- **Track Properties**: Mute, lock, solo, volume, pan
- **Visual Customization**: Color coding and naming

#### **`project_clips` Table**
```sql
-- Individual media clips positioned on timeline tracks
CREATE TABLE project_clips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id),
    track_id UUID NOT NULL REFERENCES project_tracks(id),
    media_id UUID NOT NULL REFERENCES media(id),
    -- Timeline positioning
    start_time_seconds DECIMAL(10,3) NOT NULL,
    end_time_seconds DECIMAL(10,3) NOT NULL,
    -- Visual properties
    volume DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    opacity DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    rotation_degrees DECIMAL(5,2) DEFAULT 0,
    -- ... additional fields
);
```

**Key Features**:
- **Precise Timing**: 3-decimal precision for frame-accurate editing
- **Visual Properties**: Transform, scale, position, blend modes
- **Speed Control**: Playback speed and reverse options
- **Effect Integration**: JSONB-based effect storage

### **3. Media Management System**

#### **`media` Table**
```sql
-- Comprehensive media library with file management
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
    -- ... additional fields
);
```

**Key Features**:
- **File Integrity**: SHA-256 hash verification
- **Processing Pipeline**: Status tracking and progress monitoring
- **Technical Metadata**: Codec, bitrate, sample rate, channels
- **Licensing System**: Rights management and usage tracking
- **Organization Support**: Multi-tenant media organization

#### **`effects` Table**
```sql
-- Video effects library with parameter schemas
CREATE TABLE effects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    -- Effect parameters
    parameters_schema JSONB NOT NULL DEFAULT '{}',
    default_values JSONB DEFAULT '{}',
    parameter_constraints JSONB DEFAULT '{}',
    -- ... additional fields
);
```

**Key Features**:
- **Parameter Schemas**: JSON Schema validation for effects
- **Constraint System**: Min/max values and validation rules
- **Version Control**: Effect versioning and updates
- **Difficulty Levels**: User skill requirement indicators
- **Processing Complexity**: Resource usage estimation

#### **`transitions` Table**
```sql
-- Transition effects for smooth scene changes
CREATE TABLE transitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    -- Transition properties
    duration_seconds DECIMAL(5,3) NOT NULL DEFAULT 1.0,
    parameters_schema JSONB NOT NULL DEFAULT '{}',
    -- ... additional fields
);
```

**Key Features**:
- **Duration Control**: Precise transition timing
- **Parameter System**: Customizable transition effects
- **Category Organization**: Logical grouping of transitions
- **Preview Support**: Visual transition previews

### **4. Configuration and Settings**

#### **`project_settings` Table**
```sql
-- Project-specific configuration and preferences
CREATE TABLE project_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID UNIQUE NOT NULL REFERENCES projects(id),
    -- Video settings
    video_settings JSONB NOT NULL DEFAULT '{}',
    audio_settings JSONB NOT NULL DEFAULT '{}',
    export_settings JSONB NOT NULL DEFAULT '{}',
    -- Timeline settings
    timeline_settings JSONB NOT NULL DEFAULT '{}',
    playback_settings JSONB NOT NULL DEFAULT '{}',
    -- ... additional fields
);
```

**Key Features**:
- **Modular Settings**: Organized by functionality
- **JSONB Storage**: Flexible configuration options
- **Default Values**: Sensible project defaults
- **Export Configuration**: Rendering and output settings

#### **`user_preferences` Table**
```sql
-- User-specific interface and application preferences
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id),
    -- Interface preferences
    ui_preferences JSONB NOT NULL DEFAULT '{}',
    editor_preferences JSONB NOT NULL DEFAULT '{}',
    timeline_preferences JSONB NOT NULL DEFAULT '{}',
    -- ... additional fields
);
```

**Key Features**:
- **Personalization**: User-specific interface settings
- **Performance Tuning**: Quality and performance preferences
- **Notification Control**: Communication preference management
- **Editor Customization**: Tool and workflow preferences

## 🔗 Relationships and Constraints

### **1. Referential Integrity**
```sql
-- Strong foreign key relationships
project_clips.project_id → projects.id (CASCADE)
project_clips.track_id → project_tracks.id (CASCADE)
project_clips.media_id → media.id (RESTRICT)
organization_members.organization_id → organizations.id (CASCADE)
```

### **2. Data Validation Constraints**
```sql
-- Business logic enforcement
CONSTRAINT project_clips_time_order CHECK (start_time_seconds < end_time_seconds)
CONSTRAINT project_clips_volume_range CHECK (volume >= 0 AND volume <= 2)
CONSTRAINT project_clips_opacity_range CHECK (opacity >= 0 AND opacity <= 1)
CONSTRAINT users_username_length CHECK (char_length(username) >= 3)
CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
```

### **3. Unique Constraints**
```sql
-- Data uniqueness enforcement
UNIQUE(organization_id, user_id) -- organization_members
UNIQUE(project_id, track_number) -- project_tracks
UNIQUE(project_id) -- project_settings
UNIQUE(user_id) -- user_preferences
```

## 📈 Performance Optimization

### **1. Strategic Indexing**
```sql
-- Primary performance indexes
CREATE INDEX idx_projects_slug ON projects(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_media_processing_status ON media(processing_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_clips_time ON project_clips(project_id, start_time_seconds, end_time_seconds);

-- Full-text search indexes
CREATE INDEX idx_projects_search ON projects USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_media_search ON media USING GIN(to_tsvector('english', filename || ' ' || COALESCE(original_filename, '')));

-- JSONB indexes for metadata queries
CREATE INDEX idx_projects_tags ON projects USING GIN(tags) WHERE deleted_at IS NULL;
CREATE INDEX idx_effects_tags ON effects USING GIN(tags);
```

### **2. Partial Indexes**
```sql
-- Index only active records
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
```

### **3. Composite Indexes**
```sql
-- Multi-column query optimization
CREATE INDEX idx_project_tracks_number ON project_tracks(project_id, track_number);
CREATE INDEX idx_project_clips_time ON project_clips(project_id, start_time_seconds, end_time_seconds);
```

## 🔧 Database Functions and Triggers

### **1. Automatic Timestamp Updates**
```sql
-- Function to update modified timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Applied to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### **2. Utility Functions**
```sql
-- Slug generation for SEO-friendly URLs
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(input_text, '[^a-zA-Z0-9\s-]', '', 'g'));
END;
$$ language 'plpgsql';

-- Clip duration calculation
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
```

## 🚀 Scalability Features

### **1. UUID Primary Keys**
- **Distributed Systems**: No coordination required for ID generation
- **Security**: Non-sequential IDs prevent enumeration attacks
- **Performance**: Efficient indexing and storage
- **Migration**: Easy to merge databases without conflicts

### **2. JSONB for Flexibility**
- **Schema Evolution**: Add new fields without migrations
- **Query Performance**: GIN indexes for fast JSON queries
- **Validation**: Application-level schema enforcement
- **Metadata Storage**: Flexible property storage

### **3. Soft Deletes**
- **Data Recovery**: Reversible deletion operations
- **Audit Trail**: Complete data history preservation
- **Performance**: Indexes exclude deleted records
- **Compliance**: Regulatory data retention support

## 🔒 Security Features

### **1. Role-Based Access Control**
```sql
-- Hierarchical permission system
CREATE TYPE user_role AS ENUM (
    'super_admin', 'admin', 'manager', 'editor', 'reviewer', 'viewer', 'guest'
);
```

### **2. Data Validation**
```sql
-- Input sanitization and validation
CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
CONSTRAINT projects_slug_format CHECK (slug ~* '^[a-z0-9-]+$')
```

### **3. Audit Trail**
```sql
-- Complete change tracking
created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
deleted_at TIMESTAMP WITH TIME ZONE
```

## 📊 Data Types and Constraints

### **1. Time Precision**
```sql
-- Frame-accurate timing (assuming 60fps)
duration_seconds DECIMAL(10,3) -- 3 decimal places = 1ms precision
start_time_seconds DECIMAL(10,3) -- Supports 9999999.999 seconds
```

### **2. Media Specifications**
```sql
-- High-resolution support
resolution_width INTEGER -- Supports up to 2^31 pixels
frame_rate DECIMAL(5,2) -- Supports 999.99 fps
bitrate INTEGER -- Supports up to 2^31 bps
```

### **3. File Management**
```sql
-- Large file support
file_size BIGINT -- Supports up to 2^63 bytes (8 exabytes)
file_hash VARCHAR(64) -- SHA-256 hash storage
```

## 🔄 Migration and Versioning

### **1. Schema Versioning**
```sql
-- Version tracking in schema
-- Version: 1.0.0
-- Created: 2024
-- Description: Comprehensive video editing platform database
```

### **2. Backward Compatibility**
- **New Fields**: Added with sensible defaults
- **Enum Extensions**: New values added to existing enums
- **Index Changes**: Non-breaking performance improvements
- **Function Updates**: Enhanced functionality without breaking changes

## 📚 Best Practices Implementation

### **1. Naming Conventions**
- **Consistent**: All tables, columns, and indexes follow patterns
- **Descriptive**: Names clearly indicate purpose and content
- **Searchable**: Easy to find and understand relationships

### **2. Documentation**
- **Inline Comments**: Table and column descriptions
- **Constraint Names**: Meaningful constraint identifiers
- **Function Documentation**: Clear purpose and usage

### **3. Performance Considerations**
- **Index Strategy**: Strategic indexing for common queries
- **Query Optimization**: Efficient table relationships
- **Data Partitioning**: Ready for future horizontal scaling

## 🎯 Future-Proofing Features

### **1. Extensibility**
- **JSONB Fields**: Flexible metadata storage
- **Plugin Architecture**: Effects and transitions as plugins
- **API Support**: RESTful endpoint optimization

### **2. Scalability**
- **Sharding Ready**: UUID-based partitioning support
- **Read Replicas**: Optimized for read-heavy workloads
- **Caching Integration**: Redis integration points

### **3. Integration**
- **Third-Party APIs**: External service integration support
- **Webhook Support**: Event-driven architecture ready
- **Analytics**: Performance and usage tracking support

---

## 🚀 Getting Started

### **1. Database Setup**
```bash
# Start PostgreSQL with the schema
docker-compose up -d postgres

# Verify the database is running
docker exec -it kira_media_postgres psql -U kira_user -d kira_media -c "\dt"
```

### **2. Sample Data**
```sql
-- The schema includes sample effects and transitions
SELECT * FROM effects WHERE is_preset = true;
SELECT * FROM transitions WHERE is_preset = true;
```

### **3. First Project**
```sql
-- Create your first project
INSERT INTO projects (name, slug, description, created_by) 
VALUES ('My First Video', 'my-first-video', 'Learning video editing', 
        (SELECT id FROM users WHERE username = 'admin'));
```

---

**This database schema is production-ready and follows industry best practices. It's designed to scale with your application and won't need structural changes as you grow. 🎬✨**
