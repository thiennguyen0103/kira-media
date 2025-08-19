'use client';

import { Button } from '@/components/ui/button';
import {
  Play,
  Square,
  Ratio,
  Maximize2,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
} from 'lucide-react';

export function VideoPlayer() {
  return (
    <div className="flex h-full flex-col">
      {/* Panel Header */}
      <div className="border-border flex-shrink-0 border-b px-4 py-2">
        <h3 className="text-foreground text-sm font-medium">Player</h3>
      </div>

      {/* Video Content Area - Optimized for Preview */}
      <div className="flex flex-1 items-center justify-center p-2">
        <div className="flex h-full max-h-full w-full max-w-full items-center justify-center">
          {/* Video Preview Container */}
          <div className="relative h-full max-h-96 w-full max-w-2xl overflow-hidden rounded-lg bg-black shadow-lg">
            {/* Video Placeholder */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Play className="ml-1 h-12 w-12 text-white" />
                </div>
                <p className="text-sm font-medium text-white/70">
                  Video Preview
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Drag and drop video files here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls - Smaller Icons */}
      <div className="border-border flex-shrink-0 border-t px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Time Display */}
          <div className="text-muted-foreground font-mono text-xs">
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
