'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Save, Upload, Download, Settings, User, Play, Share2, HelpCircle, Menu, Crown, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      {/* Main Header Bar */}
      <div className="flex h-14 items-center px-6">
        {/* Left Side - CapCut Style */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 h-9 px-4 text-sm font-medium">
            <Menu className="mr-2 h-4 w-4" />
            Menu
          </Button>
          <div className="w-px h-6 bg-gray-600"></div>
          <h1 className="text-xl font-bold text-white">CapCut</h1>
        </div>

        {/* Center - Project Name - CapCut Style */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
            <h2 className="text-base font-semibold text-white">0729</h2>
          </div>
        </div>

        {/* Right Side - Actions - CapCut Style */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 h-9 px-4 text-sm font-medium">
            <Crown className="mr-2 h-4 w-4" />
            Pro
          </Button>
          <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 h-9 px-4 text-sm font-medium">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 h-9 px-4 text-sm font-medium shadow-sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Secondary Toolbar - CapCut Style */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center space-x-8">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Media
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Audio
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Text
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Stickers
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Effects
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Transitions
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Captions
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Filters
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Adjustment
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            AI avatars
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 hover:text-white h-9 px-4 text-sm font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white">
            Player
          </Button>
        </div>
      </div>
    </header>
  );
}
