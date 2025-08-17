'use client';

import { Button } from '@/components/ui/button';
import { 
  Import, 
  Video, 
  ChevronDown, 
  Folder, 
  User, 
  Sparkles as SparklesIcon, 
  Globe, 
  BookOpen 
} from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

export function Sidebar({ selectedTool, onToolSelect }: SidebarProps) {
  const navigationItems = [
    { id: 'media', label: 'Media', icon: Folder },
    { id: 'audio', label: 'Audio', icon: Video },
    { id: 'text', label: 'Text', icon: BookOpen },
    { id: 'stickers', label: 'Stickers', icon: SparklesIcon },
    { id: 'effects', label: 'Effects', icon: SparklesIcon },
    { id: 'transitions', label: 'Transitions', icon: Video },
    { id: 'captions', label: 'Captions', icon: BookOpen },
    { id: 'filters', label: 'Filters', icon: SparklesIcon },
    { id: 'adjustment', label: 'Adjustment', icon: Video },
    { id: 'ai-avatars', label: 'AI avatars', icon: User },
    { id: 'player', label: 'Player', icon: Video },
  ];

  return (
    <div className="bg-card flex w-20 flex-col border-r border-border">
      {/* CapCut Style Import Section */}
      <div className="p-3 border-b border-border">
        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 font-medium shadow-sm p-0">
            <Import className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full h-9 font-medium p-0">
            <Video className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Large Drag and Drop Area - CapCut Style */}
        <div className="mt-4">
          <div className="w-full h-32 bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CapCut Style Left Navigation with Red Border Highlight - Icons Only */}
      <div className="flex-1 p-3 space-y-2">
        {/* Navigation Categories */}
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedTool === item.id;
            
            return (
              <div
                key={item.id}
                className={`relative cursor-pointer transition-all duration-200 group ${
                  isActive ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
                onClick={() => onToolSelect(item.id)}
              >
                {/* Red Border Highlight on Left Side */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-sm"></div>
                )}
                
                {/* Icon Only */}
                <div className={`flex items-center justify-center p-3 rounded-lg ${
                  isActive ? 'pl-4' : 'pl-3'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`} />
                </div>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Section */}
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <Folder className="h-5 w-5 text-blue-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Media Library
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Subprojects Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <Folder className="h-5 w-5 text-purple-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Subprojects
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Yours Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <User className="h-5 w-5 text-green-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Your Media
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* AI Media Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <SparklesIcon className="h-5 w-5 text-yellow-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              AI Media
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Spaces Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <Globe className="h-5 w-5 text-cyan-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Spaces
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Library Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-center cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors group">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Library
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
