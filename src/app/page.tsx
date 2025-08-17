'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Folder, 
  Clock, 
  User, 
  Calendar,
  MoreVertical,
  Play,
  Edit,
  Trash2,
  Star,
  Grid,
  List
} from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  duration: string;
  lastModified: string;
  author: string;
  isFavorite: boolean;
  status: 'draft' | 'published' | 'archived';
}

const mockProjects: Project[] = [
  {
    id: '0729',
    name: 'Walt Disney Short Film - Paperman',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:06:19:14',
    lastModified: '2024-01-15',
    author: 'Kira',
    isFavorite: true,
    status: 'draft'
  },
  {
    id: '0730',
    name: 'Summer Vacation Highlights',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:03:45:22',
    lastModified: '2024-01-14',
    author: 'Kira',
    isFavorite: false,
    status: 'published'
  },
  {
    id: '0731',
    name: 'Product Demo Video',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:02:15:08',
    lastModified: '2024-01-13',
    author: 'Kira',
    isFavorite: true,
    status: 'draft'
  },
  {
    id: '0732',
    name: 'Birthday Party Memories',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:04:30:15',
    lastModified: '2024-01-12',
    author: 'Kira',
    isFavorite: false,
    status: 'archived'
  },
  {
    id: '0733',
    name: 'Tutorial: How to Edit Videos',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:08:20:45',
    lastModified: '2024-01-11',
    author: 'Kira',
    isFavorite: true,
    status: 'draft'
  },
  {
    id: '0734',
    name: 'Travel Vlog - Japan Trip',
    thumbnail: '/api/placeholder/300/200',
    duration: '00:12:15:30',
    lastModified: '2024-01-10',
    author: 'Kira',
    isFavorite: false,
    status: 'published'
  }
];

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleFavorite = (projectId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, isFavorite: !project.isFavorite }
        : project
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'published': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'archived': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'published': return 'Published';
      case 'archived': return 'Archived';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">CapCut</h1>
            <div className="w-px h-8 bg-border"></div>
            <h2 className="text-lg font-medium text-foreground">Projects</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-background border border-input text-foreground rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <div className="flex items-center space-x-1 bg-background border border-input rounded">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`h-8 px-2 ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`h-8 px-2 ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:border-border/60 transition-colors cursor-pointer group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="w-full h-40 bg-muted rounded-t-lg flex items-center justify-center">
                      <Folder className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.id);
                        }}
                        className="h-7 w-7 p-0 bg-background/80 hover:bg-background/90 text-foreground backdrop-blur-sm"
                      >
                        <Star className={`h-3 w-3 ${project.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 bg-background/80 hover:bg-background/90 text-foreground backdrop-blur-sm"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-foreground font-semibold text-sm mb-1 truncate">{project.name}</h3>
                      <p className="text-muted-foreground text-xs">Project {project.id}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{project.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(project.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Link href={`/editor/${project.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <Folder className="h-6 w-6 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-foreground font-semibold text-sm truncate">{project.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">Project {project.id}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{project.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(project.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(project.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Star className={`h-4 w-4 ${project.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      </Button>
                      
                      <Link href={`/editor/${project.id}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8 px-3">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or create a new project</p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
