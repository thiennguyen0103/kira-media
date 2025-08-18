# 🐳 Docker Setup for Kira Media Video Editor

This guide will help you set up and run the Kira Media video editing application using Docker with a complete database infrastructure.

## 🏗️ Architecture Overview

The application uses a microservices architecture with the following components:

- **PostgreSQL 15** - Primary database for video projects, media metadata, and user data
- **Redis 7** - Caching, session management, and real-time features
- **MinIO** - Object storage for video files, thumbnails, and media assets
- **pgAdmin** - Database management interface
- **Next.js App** - The main video editing application

## 🔐 Security & Environment Variables

**IMPORTANT**: For security, all sensitive information is now stored in environment variables instead of being hardcoded in Docker files.

### 1. Create Environment File

```bash
# Copy the example file to .env or .env.local
cp env.example .env

# Or for local development
cp env.example .env.local

# Edit the file with your own secure values
nano .env
```

### 2. Environment Variables

The following variables can be customized in your `.env` or `.env.local` file:

```bash
# Database Configuration
POSTGRES_DB=kira_media
POSTGRES_USER=kira_user
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_INITDB_ARGS=--encoding=UTF-8 --lc-collate=C --lc-ctype=C

# Redis Configuration
REDIS_PASSWORD=your_redis_password_here
REDIS_MAX_MEMORY=512mb

# MinIO Configuration
MINIO_ROOT_USER=your_minio_user
MINIO_ROOT_PASSWORD=your_minio_password
MINIO_DOMAIN=localhost

# pgAdmin Configuration
PGADMIN_DEFAULT_EMAIL=your_email@example.com
PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

# Application Configuration
NODE_ENV=development
DATABASE_URL=postgresql://your_user:your_password@postgres:5432/your_db
REDIS_URL=redis://redis:6379
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ACCESS_KEY=your_minio_user
MINIO_SECRET_KEY=your_minio_password
MINIO_BUCKET=kira-media
MINIO_USE_SSL=false

# Docker Network Configuration
DOCKER_NETWORK_SUBNET=172.20.0.0/16
```

### 3. Security Best Practices

- **Never commit `.env` or `.env.local` files** to version control
- **Use strong, unique passwords** for each service
- **Rotate passwords regularly** in production
- **Use different passwords** for development and production
- **Consider using a password manager** for secure storage

## 🚀 Quick Start

### 1. Prerequisites

- Docker Desktop installed and running
- Docker Compose v2
- At least 4GB RAM available for Docker
- Ports 3000, 5432, 6379, 8080, 9000, 9001 available

### 2. Setup Environment

```bash
# Copy example environment file
cp env.example .env

# Or for local development
cp env.example .env.local

# Edit with your secure values
nano .env
```

### 3. Start Database Services Only

```bash
# Start only the database services (recommended for development)
docker compose up -d postgres redis minio pgadmin
```

### 4. Start Complete Application

```bash
# Start the entire application stack
docker compose -f docker-compose.app.yml up -d
```

### 5. Verify Services

```bash
# Check service status
docker compose ps

# View logs
docker compose logs -f postgres
docker compose logs -f redis
docker compose logs -f minio
```

## 🗄️ Database Services

### PostgreSQL Database

- **Port**: 5432
- **Database**: `${POSTGRES_DB:-kira_media}`
- **Username**: `${POSTGRES_USER:-kira_user}`
- **Password**: `${POSTGRES_PASSWORD:-kira_password_2024}`
- **Connection String**: `postgresql://${POSTGRES_USER:-kira_user}:${POSTGRES_PASSWORD:-kira_password_2024}@localhost:5432/${POSTGRES_DB:-kira_media}`

**Features**:
- UUID primary keys for scalability
- JSONB fields for flexible metadata storage
- Full-text search capabilities
- Automatic timestamp management
- Comprehensive indexing for performance

**Schema Includes**:
- Users and authentication
- Video projects and timelines
- Media library management
- Effects and transitions
- Project settings and preferences

### Redis Cache

- **Port**: 6379
- **Password**: `${REDIS_PASSWORD:-}`
- **Memory Limit**: `${REDIS_MAX_MEMORY:-512mb}`
- **Eviction Policy**: LRU (Least Recently Used)

**Use Cases**:
- Session management
- Media metadata caching
- Real-time collaboration features
- Temporary data storage

### MinIO Object Storage

- **API Port**: 9000
- **Console Port**: 9001
- **Username**: `${MINIO_ROOT_USER:-kira_minio_user}`
- **Password**: `${MINIO_ROOT_PASSWORD:-kira_minio_password_2024}`
- **Console URL**: http://localhost:9001

**Features**:
- S3-compatible API
- Video file storage
- Thumbnail generation
- Asset management

### pgAdmin

- **Port**: 8080
- **Email**: `${PGADMIN_DEFAULT_EMAIL:-admin@kiramedia.com}`
- **Password**: `${PGADMIN_DEFAULT_PASSWORD:-admin_password_2024}`
- **URL**: http://localhost:8080

**Features**:
- Pre-configured database connection
- SQL query interface
- Database schema visualization
- Performance monitoring

## 🔧 Configuration

### Environment Variables

The application automatically uses environment variables from your `.env` or `.env.local` file:

```bash
# Database
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

# Redis
REDIS_URL=redis://redis:6379

# MinIO
MINIO_ENDPOINT=${MINIO_ENDPOINT}
MINIO_PORT=${MINIO_PORT}
MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
MINIO_BUCKET=${MINIO_BUCKET}
MINIO_USE_SSL=${MINIO_USE_SSL}
```

### Volume Mounts

- **PostgreSQL**: `/var/lib/postgresql/data`
- **Redis**: `/data`
- **MinIO**: `/data`
- **pgAdmin**: `/var/lib/pgadmin`

## 📊 Database Schema

### Core Tables

1. **users** - User accounts and authentication
2. **projects** - Video editing projects
3. **media** - Media library files
4. **project_clips** - Timeline clips and positioning
5. **project_tracks** - Audio/video tracks
6. **effects** - Video effects and filters
7. **transitions** - Scene transitions
8. **project_settings** - Project configuration

### Key Features

- **UUID Primary Keys**: Scalable and distributed-friendly
- **JSONB Fields**: Flexible metadata storage
- **Full-Text Search**: Fast content discovery
- **Automatic Timestamps**: Created/updated tracking
- **Referential Integrity**: Proper foreign key constraints

## 🛠️ Development Workflow

### 1. Database-First Development

```bash
# Setup environment
cp env.example .env
nano .env

# Start databases
docker compose up -d postgres redis minio

# Run migrations (when implemented)
npm run db:migrate

# Start development server
npm run dev
```

### 2. Database Management

```bash
# Access PostgreSQL
docker exec -it kira_media_postgres psql -U ${POSTGRES_USER:-kira_user} -d ${POSTGRES_DB:-kira_media}

# Access Redis CLI
docker exec -it kira_media_redis redis-cli

# View MinIO console
open http://localhost:9001
```

### 3. Backup and Restore

```bash
# Backup PostgreSQL
docker exec kira_media_postgres pg_dump -U ${POSTGRES_USER:-kira_user} ${POSTGRES_DB:-kira_media} > backup.sql

# Restore PostgreSQL
docker exec -i kira_media_postgres psql -U ${POSTGRES_USER:-kira_user} -d ${POSTGRES_DB:-kira_media} < backup.sql
```

## 🔒 Security Considerations

### Development Environment

- **Environment Variables**: Use `.env` or `.env.local` file for configuration
- **Network**: Local network only
- **SSL**: Disabled for local development
- **Passwords**: Use strong passwords even in development

### Production Deployment

- **Strong Passwords**: Use environment variables with strong values
- **Network Security**: Restrict external access
- **SSL/TLS**: Enable for all connections
- **Firewall**: Restrict port access
- **Backup**: Regular automated backups
- **Secrets Management**: Use proper secrets management tools

## 📈 Performance Optimization

### PostgreSQL

- **Connection Pooling**: Use connection pooling in your app
- **Indexing**: Proper indexes on frequently queried columns
- **Query Optimization**: Monitor slow queries
- **Vacuum**: Regular maintenance

### Redis

- **Memory Management**: Monitor memory usage
- **Key Expiration**: Set TTL for temporary data
- **Persistence**: RDB + AOF for reliability

### MinIO

- **Bucket Policies**: Configure access controls
- **Lifecycle Management**: Archive old files
- **CDN Integration**: For production use

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using a port
   lsof -i :5432
   ```

2. **Permission Issues**
   ```bash
   # Fix volume permissions
   sudo chown -R $USER:$USER ./docker/
   ```

3. **Service Won't Start**
   ```bash
   # Check logs
   docker compose logs service_name
   
   # Restart service
   docker compose restart service_name
   ```

4. **Database Connection Issues**
   ```bash
   # Test connection
   docker exec -it kira_media_postgres pg_isready -U ${POSTGRES_USER:-kira_user} -d ${POSTGRES_DB:-kira_media}
   ```

5. **Environment Variable Issues**
   ```bash
   # Check if .env file exists
   ls -la .env
   
   # Or check .env.local
   ls -la .env.local
   
   # Verify environment variables are loaded
   docker compose config
   ```

### Reset Everything

```bash
# Stop all services
docker compose down

# Remove volumes (WARNING: This deletes all data)
docker compose down -v

# Rebuild and start
docker compose up -d --build
```

## 📚 Next Steps

1. **Environment Setup**: Copy `env.example` to `.env` or `.env.local` and customize
2. **Database Integration**: Connect your Next.js app to PostgreSQL
3. **Media Upload**: Implement MinIO integration for file storage
4. **Caching Layer**: Use Redis for session and data caching
5. **Real-time Features**: Implement WebSocket connections
6. **Production Ready**: Configure for production deployment

## 🤝 Support

For issues or questions:
- Check Docker logs: `docker compose logs`
- Verify service health: `docker compose ps`
- Review configuration files in `./docker/` directory
- Ensure `.env` or `.env.local` file is properly configured
- Check environment variable syntax: `${VAR:-default}`

---

**Happy Video Editing! 🎬✨**
