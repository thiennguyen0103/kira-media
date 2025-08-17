'use client';

import { 
  Folder, 
  Video, 
  BookOpen, 
  Sparkles as SparklesIcon, 
  User,
  Plus,
  Camera,
  Play,
  Music,
  Type,
  Star,
  Zap,
  Layers,
  MessageSquare,
  Filter,
  Sliders,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LeftToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

export function LeftToolbar({ selectedTool, onToolSelect }: LeftToolbarProps) {
  const tabItems = [
    { id: 'import', label: 'Import', icon: Plus, color: 'text-blue-500' },
    { id: 'media', label: 'Media', icon: Play, color: 'text-green-500' },
    { id: 'audio', label: 'Audio', icon: Music, color: 'text-purple-500' },
    { id: 'text', label: 'Text', icon: Type, color: 'text-orange-500' },
    { id: 'stickers', label: 'Stickers', icon: Star, color: 'text-yellow-500' },
    { id: 'effects', label: 'Effects', icon: Zap, color: 'text-pink-500' },
    { id: 'transitions', label: 'Transitions', icon: Layers, color: 'text-indigo-500' },
    { id: 'captions', label: 'Captions', icon: MessageSquare, color: 'text-teal-500' },
    { id: 'filters', label: 'Filters', icon: Filter, color: 'text-cyan-500' },
    { id: 'adjustment', label: 'Adjustment', icon: Sliders, color: 'text-gray-500' },
    { id: 'ai-avatars', label: 'AI Avatar', icon: Bot, color: 'text-red-500' },
  ];

  return (
    <TooltipProvider>
      <div className="flex w-16 flex-col border-r bg-background">
        {/* Tab Navigation - Icons Only with Tailwind Scrollbar */}
        <div className="flex flex-1 flex-col gap-1 p-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
          {tabItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedTool === item.id;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onToolSelect(item.id)}
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground group flex-shrink-0",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    {/* Red Border Highlight on Left Side for Active Tab */}
                    {isActive && (
                      <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-sm bg-red-500" />
                    )}
                    
                    <IconComponent className={cn(
                      "h-5 w-5",
                      item.color,
                      isActive ? "opacity-100" : "opacity-70"
                    )} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Bottom Action Buttons - Icons Only */}
        <div className="border-t p-2 space-y-2 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                <Plus className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p>Import</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80">
                <Camera className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              <p>Record</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
