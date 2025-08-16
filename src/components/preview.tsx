'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Play, Square, Maximize2, Fullscreen, Ratio } from 'lucide-react';

interface PreviewProps {
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
}

export function Preview({
  isPlaying,
  onTimeUpdate,
  onDurationChange,
}: PreviewProps) {
  return (
    <div className="flex h-full flex-col">
      {/* CapCut Style Video Player */}
      <div className="flex-1 bg-black relative flex items-center justify-center">
        {/* Video Content Placeholder - CapCut Style */}
        <div className="text-center text-white/60">
          <div className="w-96 h-64 bg-gray-800 border border-gray-600 rounded flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="h-8 w-8 text-gray-400 ml-1" />
              </div>
              <p className="text-sm text-gray-400">No video loaded</p>
            </div>
          </div>
        </div>

        {/* CapCut Style Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="lg" 
              className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 p-0"
            >
              <Play className="h-8 w-8 text-white ml-1" />
            </Button>
          </div>
        )}

        {/* CapCut Style Time Display */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-green-400 px-3 py-1 rounded text-sm font-mono">
          <span>00:00:15:01</span>
          <span className="text-gray-400 mx-2">/</span>
          <span>00:06:19:14</span>
        </div>

        {/* CapCut Style View Controls */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="bg-black/70 hover:bg-black/80 text-white border border-gray-600 h-8 px-3 text-xs">
            Full
          </Button>
          <Button variant="ghost" size="sm" className="bg-black/70 hover:bg-black/80 text-white border border-gray-600 h-8 px-3 text-xs">
            <Ratio className="mr-1 h-3 w-3" />
            Ratio
          </Button>
          <Button variant="ghost" size="sm" className="bg-black/70 hover:bg-black/80 text-white border border-gray-600 h-8 px-3 text-xs">
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
