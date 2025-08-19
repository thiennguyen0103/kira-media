'use client';

import { Button } from '@/components/ui/button';
import {
  Import,
  Video,
  Folder,
  User,
  Sparkles as SparklesIcon,
  Globe,
  BookOpen,
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
    <div className="bg-card border-border flex w-20 flex-col border-r">
      {/* CapCut Style Import Section */}
      <div className="border-border border-b p-3">
        <div className="space-y-3">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 w-full p-0 font-medium shadow-sm">
            <Import className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-9 w-full p-0 font-medium">
            <Video className="h-4 w-4" />
          </Button>
        </div>

        {/* Large Drag and Drop Area - CapCut Style */}
        <div className="mt-4">
          <div className="bg-muted border-border flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
              <svg
                className="text-muted-foreground mx-auto mb-2 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 4 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CapCut Style Left Navigation with Red Border Highlight - Icons Only */}
      <div className="flex-1 space-y-2 p-3">
        {/* Navigation Categories */}
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedTool === item.id;

            return (
              <div
                key={item.id}
                className={`group relative cursor-pointer transition-all duration-200 ${
                  isActive ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
                onClick={() => onToolSelect(item.id)}
              >
                {/* Red Border Highlight on Left Side */}
                {isActive && (
                  <div className="absolute top-0 bottom-0 left-0 w-1 rounded-r-sm bg-red-500"></div>
                )}

                {/* Icon Only */}
                <div
                  className={`flex items-center justify-center rounded-lg p-3 ${
                    isActive ? 'pl-4' : 'pl-3'
                  }`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  />
                </div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                  <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Section */}
        <div className="border-border space-y-2 border-t pt-4">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <Folder className="h-5 w-5 text-blue-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Media Library
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Subprojects Section */}
        <div className="space-y-2">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <Folder className="h-5 w-5 text-purple-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Subprojects
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Yours Section */}
        <div className="space-y-2">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <User className="h-5 w-5 text-green-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Your Media
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* AI Media Section */}
        <div className="space-y-2">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <SparklesIcon className="h-5 w-5 text-yellow-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              AI Media
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Spaces Section */}
        <div className="space-y-2">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <Globe className="h-5 w-5 text-cyan-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Spaces
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Library Section */}
        <div className="space-y-2">
          <div className="hover:bg-accent group flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <div className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Library
              <div className="absolute top-1/2 left-0 h-0 w-0 -translate-x-1 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
