'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, RotateCcw, RotateCw, ZoomIn, ZoomOut, Square, Ratio, Maximize2 } from 'lucide-react';

export function Preview() {
  return (
    <div className="flex h-full w-full max-w-6xl flex-col">
      {/* Video Canvas - CapCut Style */}
      <div className="flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden border border-border relative">
        {/* Video Content Placeholder */}
        <div className="text-center">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-16 w-16 text-muted-foreground ml-2" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">Video Preview</p>
          <p className="text-muted-foreground text-sm">Import media to start editing</p>
        </div>

        {/* CapCut Style Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            size="lg" 
            className="h-20 w-20 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
          >
            <Play className="h-10 w-10 ml-1" />
          </Button>
        </div>

        {/* CapCut Style Time Display */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
          <p className="text-foreground text-sm font-mono">00:00:15:01 / 00:06:19:14</p>
        </div>

        {/* CapCut Style View Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <Ratio className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Corner Controls */}
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 hover:bg-background text-foreground">
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
