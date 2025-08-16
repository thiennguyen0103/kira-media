'use client';

import { useState } from 'react';
import { Header } from './header';
import { Toolbar } from './toolbar';
import { Timeline } from './timeline';
import { Preview } from './preview';
import { Sidebar } from './sidebar';

export function VideoEditor() {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="bg-gray-900 flex h-screen flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar selectedTool={selectedTool} onToolSelect={setSelectedTool} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Toolbar */}
          <Toolbar
            selectedTool={selectedTool}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            currentTime={currentTime}
            duration={duration}
          />

          {/* Preview Area - CapCut Style */}
          <div className="flex-1 flex flex-col bg-black p-4">
            <div className="flex-1 flex items-center justify-center">
              <Preview
                isPlaying={isPlaying}
                onTimeUpdate={setCurrentTime}
                onDurationChange={setDuration}
              />
            </div>
          </div>

          {/* Timeline */}
          <Timeline
            currentTime={currentTime}
            duration={duration}
            onTimeChange={setCurrentTime}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}
