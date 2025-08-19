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
    <div className="bg-background flex h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <LeftToolbar
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />

        {/* Toolbar Content Panel with Scroll */}
        <div className="bg-card border-border w-80 overflow-hidden border-r">
          <ToolbarContent selectedTool={selectedTool} />
        </div>

        {/* Main Content - Video Player + Details Panel */}
        <div className="flex flex-1 flex-col">
          {/* Top Section - Video Player + Details */}
          <div className="flex flex-1 overflow-hidden">
            {/* Video Player Panel (Left) */}
            <div className="bg-card border-border flex-1 border-r">
              <VideoPlayer />
            </div>

            {/* Details Panel (Right) */}
            <div className="bg-card w-80">
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
            <h3 className="mb-4 text-lg font-semibold">Import Media</h3>
            <div className="space-y-4">
              {/* Drag and Drop Area */}
              <div className="bg-muted border-border flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <Plus className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
                  <p className="text-muted-foreground text-sm font-medium">
                    Drag and drop videos, photos, and audio files here
                  </p>
                </div>
              </div>

              {/* Creation Tools */}
              <div className="space-y-3">
                <h4 className="text-foreground text-sm font-medium">
                  No media? Create with these tools
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <button className="bg-muted hover:bg-accent flex w-full items-center space-x-3 rounded-lg p-3 transition-colors">
                    <Play className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">AI media</span>
                  </button>
                  <button className="bg-muted hover:bg-accent flex w-full items-center space-x-3 rounded-lg p-3 transition-colors">
                    <User className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">AI avatars</span>
                  </button>
                  <button className="bg-muted hover:bg-accent flex w-full items-center space-x-3 rounded-lg p-3 transition-colors">
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
            <h3 className="mb-4 text-lg font-semibold">Media Library</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Recent media files
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Imported videos</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Photo collections
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Audio files</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Project assets</p>
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Audio</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Background music
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Sound effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Voice recordings
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Audio tracks</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Music library</p>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Text & Titles</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Title templates</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Text animations</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Font styles</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Text effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Typography</p>
              </div>
            </div>
          </div>
        );
      case 'stickers':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Stickers & Emojis</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Fun stickers</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Emoji collection
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Custom stickers</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Animated stickers
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Sticker packs</p>
              </div>
            </div>
          </div>
        );
      case 'effects':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Video Effects</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Visual effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Motion graphics</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Special effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Effect presets</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Custom effects</p>
              </div>
            </div>
          </div>
        );
      case 'transitions':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Transitions</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Scene transitions
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Smooth effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Transition presets
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Custom transitions
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Transition library
                </p>
              </div>
            </div>
          </div>
        );
      case 'captions':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Captions</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Auto-generated captions
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Manual caption editing
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Caption styles</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Subtitle tools</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Caption templates
                </p>
              </div>
            </div>
          </div>
        );
      case 'filters':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Filters</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Color filters</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Preset filters</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Custom filters</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Filter effects</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Filter library</p>
              </div>
            </div>
          </div>
        );
      case 'adjustment':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Adjustments</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Brightness & contrast
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Color grading</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Saturation & hue
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Exposure settings
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Color correction
                </p>
              </div>
            </div>
          </div>
        );
      case 'ai-avatars':
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">AI Avatars</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  AI-generated characters
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Virtual presenters
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  Avatar customization
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">
                  AI personalities
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-muted-foreground text-sm">Avatar library</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Select a Tab</h3>
            <p className="text-muted-foreground text-sm">
              Choose a tab from the left toolbar to see its options
            </p>
          </div>
        );
    }
  };

  return (
    <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 h-full overflow-x-hidden overflow-y-auto">
      {renderContent()}
    </div>
  );
}
