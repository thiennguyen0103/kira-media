'use client';

import { Button } from '@/components/ui/button';
import {
  Play,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Square,
  Ratio,
  Maximize2,
} from 'lucide-react';

export function Preview() {
  return (
    <div className="flex h-full w-full max-w-6xl flex-col">
      {/* Video Canvas - CapCut Style */}
      <div className="border-border relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border bg-black">
        {/* Video Content Placeholder */}
        <div className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full">
            <Play className="text-muted-foreground ml-2 h-16 w-16" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Video Preview
          </p>
          <p className="text-muted-foreground text-sm">
            Import media to start editing
          </p>
        </div>

        {/* CapCut Style Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-primary/90 hover:bg-primary text-primary-foreground h-20 w-20 rounded-full shadow-lg"
          >
            <Play className="ml-1 h-10 w-10" />
          </Button>
        </div>

        {/* CapCut Style Time Display */}
        <div className="bg-background/90 border-border absolute bottom-4 left-4 rounded-lg border px-3 py-2 backdrop-blur-sm">
          <p className="text-foreground font-mono text-sm">
            00:00:15:01 / 00:06:19:14
          </p>
        </div>

        {/* CapCut Style View Controls */}
        <div className="absolute right-4 bottom-4 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <Ratio className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Corner Controls */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
          <Button
            variant="ghost"
            size="sm"
            className="bg-background/90 hover:bg-background text-foreground h-8 w-8 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Controls - CapCut Style */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <Button variant="outline" size="sm" className="h-9 px-4">
          <Play className="mr-2 h-4 w-4" />
          Play
        </Button>
        <Button variant="outline" size="sm" className="h-9 px-4">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button variant="outline" size="sm" className="h-9 px-4">
          <ZoomIn className="mr-2 h-4 w-4" />
          Zoom In
        </Button>
        <Button variant="outline" size="sm" className="h-9 px-4">
          <ZoomOut className="mr-2 h-4 w-4" />
          Zoom Out
        </Button>
      </div>
    </div>
  );
}
