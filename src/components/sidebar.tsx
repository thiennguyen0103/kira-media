'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  MousePointer,
  Scissors,
  Type,
  Image,
  Music,
  Film,
  FolderOpen,
  Clock,
  Layers,
  Sparkles,
  Palette,
  Crop,
  Import,
  Video,
  Search,
  Grid,
  List,
  ChevronDown,
  Play,
  Square,
  Plus,
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
  return (
    <div className="bg-gray-800 flex w-80 flex-col border-r border-gray-700">
      {/* CapCut Style Import Section */}
      <div className="p-5 border-b border-gray-700">
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-medium shadow-sm">
            <Import className="mr-2 h-4 w-4" />
            + Import
          </Button>
          <Button variant="ghost" className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-11 font-medium">
            <Video className="mr-2 h-4 w-4" />
            Record
          </Button>
        </div>
        
        {/* Search Bar - CapCut Style */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search media..."
            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>
        
        {/* View Options - CapCut Style */}
        <div className="mt-4 flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* CapCut Style Navigation */}
      <div className="flex-1 p-5 space-y-5">
        {/* Media Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Media</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6 space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <div className="w-14 h-9 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                <Play className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">Walt Disney Short Film_Paperman.mp4</p>
                <p className="text-xs text-gray-400">00:06:19:14</p>
              </div>
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Added
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <div className="w-14 h-9 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                <Play className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">Sample Video.mp4</p>
                <p className="text-xs text-gray-400">00:02:45:30</p>
              </div>
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Added
              </div>
            </div>
          </div>
        </div>

        {/* Subprojects Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Subprojects</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6">
            <p className="text-xs text-gray-400 italic">No subprojects</p>
          </div>
        </div>

        {/* Yours Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-green-400" />
              <h3 className="text-sm font-semibold text-white">Yours</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6">
            <p className="text-xs text-gray-400 italic">No personal media</p>
          </div>
        </div>

        {/* AI Media Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-4 w-4 text-yellow-400" />
              <h3 className="text-sm font-semibold text-white">AI media</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6">
            <p className="text-xs text-gray-400 italic">No AI generated content</p>
          </div>
        </div>

        {/* Spaces Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Spaces</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6">
            <p className="text-xs text-gray-400 italic">No shared spaces</p>
          </div>
        </div>

        {/* Library Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-white">Library</h3>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="pl-6">
            <p className="text-xs text-gray-400 italic">No library items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
