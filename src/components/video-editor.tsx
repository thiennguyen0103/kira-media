'use client';

import { useState } from 'react';
import { Plus, Play, User, Camera } from 'lucide-react';
import { Header } from './header';
import { LeftToolbar } from './left-toolbar';
import { VideoPlayer } from './video-player';
import { DetailsPanel } from './details-panel';
import { Timeline } from './timeline';

export function VideoEditor() {
  const [selectedTool, setSelectedTool] = useState('import');

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <LeftToolbar selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        
        {/* Toolbar Content Panel with Scroll */}
        <div className="w-80 bg-card border-r border-border overflow-hidden">
          <ToolbarContent selectedTool={selectedTool} />
        </div>
        
        {/* Main Content - Video Player + Details Panel */}
        <div className="flex flex-1 flex-col">
          {/* Top Section - Video Player + Details */}
          <div className="flex flex-1 overflow-hidden">
            {/* Video Player Panel (Left) */}
            <div className="flex-1 bg-card border-r border-border">
              <VideoPlayer />
            </div>
            
            {/* Details Panel (Right) */}
            <div className="w-80 bg-card">
              <DetailsPanel />
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline Panel (Bottom) - Full Width */}
      <Timeline />
    </div>
  );
}

// Toolbar Content Component
function ToolbarContent({ selectedTool }: { selectedTool: string }) {
  const renderContent = () => {
    switch (selectedTool) {
      case 'import':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Import Media</h3>
            <div className="space-y-4">
              {/* Drag and Drop Area */}
              <div className="w-full h-48 bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-medium">Drag and drop videos, photos, and audio files here</p>
                </div>
              </div>
              
              {/* Creation Tools */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">No media? Create with these tools</h4>
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full bg-muted hover:bg-accent p-3 rounded-lg flex items-center space-x-3 transition-colors">
                    <Play className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">AI media</span>
                  </button>
                  <button className="w-full bg-muted hover:bg-accent p-3 rounded-lg flex items-center space-x-3 transition-colors">
                    <User className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">AI avatars</span>
                  </button>
                  <button className="w-full bg-muted hover:bg-accent p-3 rounded-lg flex items-center space-x-3 transition-colors">
                    <Camera className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium">Record</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Media Library</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Recent media files</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Imported videos</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Photo collections</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Audio files</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Project assets</p>
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Audio</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Background music</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Sound effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Voice recordings</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Audio tracks</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Music library</p>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Text & Titles</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Title templates</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Text animations</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Font styles</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Text effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Typography</p>
              </div>
            </div>
          </div>
        );
      case 'stickers':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Stickers & Emojis</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Fun stickers</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Emoji collection</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Custom stickers</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Animated stickers</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Sticker packs</p>
              </div>
            </div>
          </div>
        );
      case 'effects':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Video Effects</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Visual effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Motion graphics</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Special effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Effect presets</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Custom effects</p>
              </div>
            </div>
          </div>
        );
      case 'transitions':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Transitions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Scene transitions</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Smooth effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Transition presets</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Custom transitions</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Transition library</p>
              </div>
            </div>
          </div>
        );
      case 'captions':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Captions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Auto-generated captions</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Manual caption editing</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Caption styles</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Subtitle tools</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Caption templates</p>
              </div>
            </div>
          </div>
        );
      case 'filters':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Color filters</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Preset filters</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Custom filters</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Filter effects</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Filter library</p>
              </div>
            </div>
          </div>
        );
      case 'adjustment':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Adjustments</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Brightness & contrast</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Color grading</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Saturation & hue</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Exposure settings</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Color correction</p>
              </div>
            </div>
          </div>
        );
      case 'ai-avatars':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">AI Avatars</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">AI-generated characters</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Virtual presenters</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Avatar customization</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">AI personalities</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Avatar library</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Select a Tab</h3>
            <p className="text-sm text-muted-foreground">Choose a tab from the left toolbar to see its options</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
      {renderContent()}
    </div>
  );
}
