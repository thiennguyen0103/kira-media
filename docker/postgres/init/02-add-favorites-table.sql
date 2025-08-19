-- Add project_likes table for handling project favorites
CREATE TABLE IF NOT EXISTS project_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure a user can only like a project once
    UNIQUE(project_id, user_id)
);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_user_id ON project_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_created_at ON project_likes(created_at);

-- Add comment
COMMENT ON TABLE project_likes IS 'Stores user likes/favorites for projects';
COMMENT ON COLUMN project_likes.project_id IS 'Reference to the project being liked';
COMMENT ON COLUMN project_likes.user_id IS 'Reference to the user who liked the project';
COMMENT ON COLUMN project_likes.created_at IS 'When the like was created';
