'use client';

import { Button } from '@/components/ui/button';
import { Play, Square, Ratio, Maximize2, SkipBack, SkipForward, Volume2, Settings } from 'lucide-react';

export function VideoPlayer() {
  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="px-4 py-2 border-b border-border flex-shrink-0">
        <h3 className="text-sm font-medium text-foreground">Player</h3>
      </div>
      
      {/* Video Content Area - Optimized for Preview */}
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
          {/* Video Preview Container */}
          <div className="relative w-full h-full max-w-2xl max-h-96 bg-black rounded-lg overflow-hidden shadow-lg">
            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
                <p className="text-white/70 text-sm font-medium">Video Preview</p>
                <p className="text-white/50 text-xs mt-1">Drag and drop video files here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Player Controls - Smaller Icons */}
      <div className="px-3 py-2 border-t border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Time Display */}
          <div className="text-xs text-muted-foreground font-mono">
            00:00:00:00 / 00:00:00:00
          </div>
          
          {/* Control Buttons - Smaller Size */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <SkipBack className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Play className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <SkipForward className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Square className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Ratio className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Volume2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
