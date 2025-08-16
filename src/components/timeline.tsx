'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Layers, Scissors, Volume2, Film, Type, Image, Music, Clock, Trash2, Copy, Settings, Eye, EyeOff, Play, Pause, SkipBack, SkipForward, RotateCcw, RotateCw, ZoomIn, ZoomOut, Grid3X3, Maximize2, Import, Search, Grid, List, EyeIcon, VolumeX, Lock, Unlock } from 'lucide-react';

interface TimelineProps {
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
  isPlaying: boolean;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function Timeline({
  currentTime,
  duration,
  onTimeChange,
  isPlaying,
}: TimelineProps) {
  return (
    <div className="bg-gray-900 h-80 border-t border-gray-700 flex flex-col">
      {/* CapCut Style Timeline Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-medium text-white">Timeline</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-7 px-2 text-xs">
                <Plus className="mr-1 h-3 w-3" />
                Add Track
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-7 px-2 text-xs">
              <Scissors className="mr-1 h-3 w-3" />
              Split
            </Button>
            <Button variant="ghost" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-7 px-2 text-xs">
              <Copy className="mr-1 h-3 w-3" />
              Copy
            </Button>
            <Button variant="ghost" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-7 px-2 text-xs">
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* CapCut Style Timeline Ruler */}
      <div className="bg-gray-800 relative h-8 border-b border-gray-700">
        {/* Time Markers - CapCut Style */}
        <div className="flex h-full items-center px-4 w-full">
          {Array.from({ length: Math.ceil(duration / 60) + 1 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative">
              <div className="bg-gray-500 h-4 w-px" />
              <span className="text-gray-300 mt-1 text-xs font-mono">
                {formatTime(i * 60)}
              </span>
            </div>
          ))}
        </div>

        {/* CapCut Style Playhead */}
        <div
          className="absolute top-0 z-20 h-full w-0.5 bg-white shadow-lg"
          style={{
            left: `${(currentTime / (duration || 100)) * 100}%`,
            transition: isPlaying ? 'none' : 'left 0.1s ease',
          }}
        />
      </div>

      {/* CapCut Style Track Management */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Track Headers - CapCut Style */}
        <div className="bg-gray-800 border-b border-gray-700 px-3 py-2 flex items-center">
          <div className="w-16 text-xs font-medium text-gray-300">Track</div>
          <div className="flex-1 text-xs font-medium text-gray-300">Content</div>
          <div className="w-20 text-xs font-medium text-gray-300">Controls</div>
        </div>

        {/* CapCut Style Tracks */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Video Track 1 - CapCut Style */}
          <div className="bg-gray-800 border border-gray-700 rounded h-16 flex items-center">
            <div className="w-16 flex items-center justify-center space-x-2 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <EyeIcon className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <VolumeX className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1 flex items-center h-full px-2">
              <div className="flex items-center space-x-1 h-full">
                {/* Video Thumbnails - CapCut Style */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 w-16 bg-gray-700 border border-gray-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                    <span className="text-xs text-gray-400">V{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-20 flex items-center justify-center space-x-1 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Settings className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Lock className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Video Track 2 - CapCut Style */}
          <div className="bg-gray-800 border border-gray-700 rounded h-16 flex items-center">
            <div className="w-16 flex items-center justify-center space-x-2 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <EyeIcon className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <VolumeX className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1 flex items-center h-full px-2">
              <div className="flex items-center space-x-1 h-full">
                {/* Video Thumbnails - CapCut Style */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 w-16 bg-gray-700 border border-gray-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                    <span className="text-xs text-gray-400">V{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-20 flex items-center justify-center space-x-1 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Settings className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Lock className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Audio Track - CapCut Style */}
          <div className="bg-gray-800 border border-gray-700 rounded h-16 flex items-center">
            <div className="w-16 flex items-center justify-center space-x-2 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <EyeIcon className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Volume2 className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1 flex items-center h-full px-2">
              <div className="flex items-center space-x-1 h-full">
                {/* Audio Waveform - CapCut Style */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-8 w-3 bg-gray-700 border border-gray-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                    <div className="h-4 w-1 bg-gray-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-20 flex items-center justify-center space-x-1 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Settings className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Lock className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Text Track - CapCut Style */}
          <div className="bg-gray-800 border border-gray-700 rounded h-16 flex items-center">
            <div className="w-16 flex items-center justify-center space-x-2 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <EyeIcon className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Type className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1 flex items-center h-full px-2">
              <div className="flex items-center space-x-1 h-full">
                {/* Text Clips - CapCut Style */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 w-20 bg-gray-700 border border-gray-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">
                    <span className="text-xs text-gray-400">T{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-20 flex items-center justify-center space-x-1 px-2">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Settings className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-gray-700 hover:bg-gray-600 text-white">
                <Lock className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CapCut Style Timeline Footer */}
      <div className="bg-gray-800 flex items-center justify-between border-t border-gray-700 p-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 h-7 px-2 text-xs">
            <Image className="mr-1 h-3 w-3" />
            Cover
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-gray-300 text-xs">Zoom:</span>
          <Slider defaultValue={[50]} max={100} className="w-24" />
        </div>
      </div>
    </div>
  );
}
