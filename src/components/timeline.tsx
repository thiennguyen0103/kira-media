'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  MousePointer, 
  Undo2, 
  Redo2, 
  Scissors, 
  Copy, 
  Clipboard, 
  Trash2, 
  Mic, 
  Volume2, 
  ZoomIn, 
  ZoomOut
} from 'lucide-react';
import { useState, useMemo } from 'react';

export function Timeline() {
  const [zoomLevel, setZoomLevel] = useState(50);
  
  // Calculate time increments based on zoom level
  const timeIncrements = useMemo(() => {
    // Zoom level 0-100 maps to different time scales
    if (zoomLevel <= 20) return 60; // 1 minute intervals
    if (zoomLevel <= 40) return 30; // 30 second intervals
    if (zoomLevel <= 60) return 15; // 15 second intervals
    if (zoomLevel <= 80) return 5;  // 5 second intervals
    return 1; // 1 second intervals
  }, [zoomLevel]);

  // Calculate pixel spacing based on zoom level
  const pixelSpacing = useMemo(() => {
    // Base spacing that increases with zoom
    return Math.max(20, Math.floor(zoomLevel * 0.8));
  }, [zoomLevel]);

  // Generate time markers based on zoom level
  const timeMarkers = useMemo(() => {
    const markers = [];
    const maxTime = 600; // 10 minutes in seconds
    const increment = timeIncrements;
    
    for (let i = 0; i <= maxTime; i += increment) {
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      markers.push({
        time: i,
        label: timeString,
        isMajor: i % (increment * 4) === 0, // Major markers every 4 increments
      });
    }
    
    return markers;
  }, [timeIncrements]);

  // Handle zoom changes
  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(100, prev + 10));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0, prev - 10));
  };

  return (
    <div className="bg-background border-t border-border">
      {/* Timeline Header with Editing Tools */}
      <div className="bg-muted border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MousePointer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Scissors className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Clipboard className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Mic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Timeline Ruler with Zoomable Time Levels */}
      <div className="bg-muted border-b border-border h-12 px-4 flex items-center overflow-x-auto">
        <div className="flex items-center min-w-full" style={{ gap: `${pixelSpacing}px` }}>
          {timeMarkers.map((marker, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                marker.isMajor ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}
              style={{ minWidth: `${pixelSpacing}px` }}
            >
              {/* Time label */}
              <span className={`text-xs font-mono ${
                marker.isMajor ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {marker.label}
              </span>
              
              {/* Tick mark */}
              <div className={`w-px bg-border mt-1 ${
                marker.isMajor ? 'h-3' : 'h-2'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Tracks Area */}
      <div className="flex-1 min-h-64 bg-background">
        {/* Video Track */}
        <div className="h-20 border-b border-border bg-muted/30 flex items-center px-4">
          <div className="w-24 text-xs font-medium text-muted-foreground">Video</div>
          <div className="flex-1 h-full relative">
            {/* Grid lines based on zoom level */}
            <div className="absolute inset-0 flex" style={{ gap: `${pixelSpacing}px` }}>
              {timeMarkers.map((_, index) => (
                <div
                  key={index}
                  className="w-px bg-border/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Audio Track */}
        <div className="h-20 border-b border-border bg-muted/20 flex items-center px-4">
          <div className="w-24 text-xs font-medium text-muted-foreground">Audio</div>
          <div className="flex-1 h-full relative">
            {/* Grid lines based on zoom level */}
            <div className="absolute inset-0 flex" style={{ gap: `${pixelSpacing}px` }}>
              {timeMarkers.map((_, index) => (
                <div
                  key={index}
                  className="w-px bg-border/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text Track */}
        <div className="h-20 border-b border-border bg-muted/10 flex items-center px-4">
          <div className="w-24 text-xs font-medium text-muted-foreground">Text</div>
          <div className="flex-1 h-full relative">
            {/* Grid lines based on zoom level */}
            <div className="absolute inset-0 flex" style={{ gap: `${pixelSpacing}px` }}>
              {timeMarkers.map((_, index) => (
                <div
                  key={index}
                  className="w-px bg-border/10"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Timeline Footer Controls with Zoom Display */}
      <div className="bg-muted border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Zoom Level Display */}
          <div className="text-xs text-muted-foreground">
            Zoom: {zoomLevel}% • {timeIncrements === 1 ? '1s' : timeIncrements === 5 ? '5s' : timeIncrements === 15 ? '15s' : timeIncrements === 30 ? '30s' : '1m'} intervals
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Slider
              value={[zoomLevel]}
              onValueChange={handleZoomChange}
              max={100}
              step={1}
              className="w-32"
            />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 100}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
