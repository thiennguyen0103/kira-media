# 🎬 Kira Media - Professional Video Editor

A modern, web-based video editing platform built with Next.js, TypeScript, and TanStack Query, featuring a comprehensive database-driven architecture.

## ✨ Features

- **Professional Video Editing**: Full-featured video editor with timeline, tracks, and effects
- **Database-Driven**: PostgreSQL backend with comprehensive project management
- **Real-time Updates**: TanStack Query for efficient data fetching and caching
- **Advanced Filtering**: Search, sort, and filter projects by multiple criteria
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components
- **Scalable Architecture**: Production-ready database schema with proper indexing

## 🏗️ Architecture

### Frontend

- **Next.js 14**: App Router with TypeScript
- **TanStack Query**: Server state management and caching
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern, accessible component library
- **Lucide React**: Beautiful, customizable icons

### Backend

- **PostgreSQL**: Production-ready database with comprehensive schema
- **Connection Pooling**: Efficient database connection management
- **Soft Deletes**: Data preservation with audit trails
- **JSONB Support**: Flexible metadata storage

## 🗄️ Database Schema

The application uses a comprehensive database schema designed for video editing workflows:

- **Projects**: Video editing projects with metadata, status tracking, and collaboration
- **Media**: File management with processing status and technical specifications
- **Effects & Transitions**: Plugin-based system with parameter schemas
- **User Management**: Role-based access control with organization support
- **Timeline**: Track-based editing with precise timing and positioning

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional, for development)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kira-media
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Or use your existing PostgreSQL instance
```

### 4. Environment Configuration

```bash
# Copy environment template
cp env.example .env.local

# Update database credentials in .env.local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kira_media
DB_USER=kira_user
DB_PASSWORD=kira_password
```

### 5. Database Initialization

```bash
# Run the database initialization script
docker exec -it kira_media_postgres psql -U kira_user -d kira_media -f /docker-entrypoint-initdb.d/01-init-database.sql
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 API Structure

### Project Management

- **GET /api/projects**: Fetch projects with filtering, sorting, and pagination
- **GET /api/projects/[id]**: Get single project details
- **POST /api/projects**: Create new project
- **PUT /api/projects/[id]**: Update project
- **DELETE /api/projects/[id]**: Soft delete project

### Advanced Features

- **Search & Filtering**: Text search, status filtering, tag-based filtering
- **Sorting**: Multiple sort options (name, date, duration, views, likes)
- **Pagination**: Efficient data loading with "Load More" functionality
- **Statistics**: Project counts, duration totals, view analytics

### Data Models

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status:
    | 'draft'
    | 'in_progress'
    | 'review'
    | 'approved'
    | 'published'
    | 'archived';
  duration_seconds: number;
  resolution_width?: number;
  resolution_height?: number;
  frame_rate?: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  thumbnail_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  share_count: number;
}
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

### Code Quality

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind CSS plugin
- **TypeScript**: Strict type checking throughout the application
- **Conventional Commits**: Structured commit message format

### Database Development

```bash
# Connect to database
docker exec -it kira_media_postgres psql -U kira_user -d kira_media

# View tables
\dt

# Sample queries
SELECT * FROM projects WHERE status = 'published';
SELECT COUNT(*) FROM projects WHERE deleted_at IS NULL;
```

## 🎯 Key Features

### Project Management

- **Comprehensive Metadata**: Duration, resolution, frame rate, difficulty level
- **Status Workflow**: Draft → In Progress → Review → Approved → Published → Archived
- **Tag System**: Flexible categorization and search
- **Collaboration**: Organization-based project sharing

### Video Editing

- **Timeline Interface**: Multi-track editing with precise timing
- **Media Library**: File management with processing status
- **Effects System**: Plugin-based effects with parameter validation
- **Export Options**: Multiple output formats and quality settings

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme support with system preference detection
- **Keyboard Shortcuts**: Power user productivity features
- **Real-time Updates**: Live collaboration and status changes

## 🔒 Security Features

- **Role-Based Access Control**: 7-tier permission system
- **Data Validation**: Input sanitization and constraint checking
- **Soft Deletes**: Data recovery and audit trail support
- **SQL Injection Protection**: Parameterized queries throughout

## 📈 Performance

- **Database Indexing**: Strategic indexes for common queries
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Optimized SQL with proper JOINs
- **Caching**: TanStack Query for client-side data caching
- **Pagination**: Efficient data loading for large datasets

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.app.yml up -d
```

### Environment Variables

Ensure all required environment variables are set in production:

- Database credentials
- Next.js configuration
- Authentication secrets
- External API keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages using conventional commits
- Include tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **TanStack** for the excellent React Query library
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** team for the amazing React framework

---

## **Built with ❤️ for video creators everywhere**

For questions and support, please open an issue or contact the development team.
