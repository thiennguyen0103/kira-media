'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Scissors,
  Type,
  Square,
  Circle,
} from 'lucide-react';

interface ToolbarProps {
  selectedTool: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function Toolbar({
  selectedTool,
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
}: ToolbarProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex h-12 items-center space-x-4 px-4">
        {/* Playback Controls - CapCut Style */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onPlayPause}
            className="h-10 w-10 p-0 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-1" />
            )}
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Timeline Slider - CapCut Style */}
        <div className="flex flex-1 items-center space-x-3">
          <span className="text-white/80 w-12 text-right text-xs font-mono">
            {formatTime(currentTime)}
          </span>

          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            className="flex-1"
            onValueChange={(value) => {
              // Handle time change
            }}
          />

          <span className="text-white/80 w-12 text-xs font-mono">
            {formatTime(duration)}
          </span>
        </div>

        {/* Editing Tools - CapCut Style */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <Circle className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls - CapCut Style */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white/80 w-16 text-center text-xs font-medium">
            100%
          </span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-white">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Current Tool Display - CapCut Style */}
        <div className="bg-gray-700 flex items-center space-x-2 rounded px-3 py-1">
          <span className="text-white/60 text-xs">Tool:</span>
          <span className="text-white text-xs font-medium capitalize">{selectedTool}</span>
        </div>
      </div>
    </div>
  );
}
