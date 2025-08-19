'use client';

import { Button } from '@/components/ui/button';
import { Settings, Info } from 'lucide-react';

export function DetailsPanel() {
  return (
    <div className="flex h-full flex-col">
      {/* Panel Header */}
      <div className="border-border flex-shrink-0 border-b px-4 py-3">
        <h3 className="text-foreground text-sm font-medium">Details</h3>
      </div>

      {/* Project Properties - Scrollable Content */}
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="space-y-4 p-4">
          <div className="space-y-3">
            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Name
              </label>
              <p className="text-foreground text-sm">0729</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Path
              </label>
              <p className="text-foreground text-xs break-all">
                C:/Users/Kira/AppData/Local/CapCut/User
                Data/Projects/com.lveditor.draft/0729
              </p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Aspect ratio
              </label>
              <p className="text-foreground text-sm">Original</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Resolution
              </label>
              <p className="text-foreground text-sm">Adapted</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Frame rate
              </label>
              <p className="text-foreground text-sm">30.00fps</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Imported media
              </label>
              <p className="text-foreground text-sm">
                Stay in original location
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-muted-foreground text-xs font-medium">
                  Proxy
                </label>
                <p className="text-foreground text-sm">Turned on</p>
              </div>
              <Info className="text-muted-foreground h-4 w-4" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-muted-foreground text-xs font-medium">
                  Arrange layers
                </label>
                <p className="text-foreground text-sm">Turned off</p>
              </div>
              <Info className="text-muted-foreground h-4 w-4" />
            </div>

            {/* Additional properties to demonstrate scrolling */}
            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Project duration
              </label>
              <p className="text-foreground text-sm">00:05:30</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Total clips
              </label>
              <p className="text-foreground text-sm">24</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Audio tracks
              </label>
              <p className="text-foreground text-sm">3</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Video tracks
              </label>
              <p className="text-foreground text-sm">2</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Effects applied
              </label>
              <p className="text-foreground text-sm">12</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Transitions
              </label>
              <p className="text-foreground text-sm">8</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Text overlays
              </label>
              <p className="text-foreground text-sm">5</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Color grading
              </label>
              <p className="text-foreground text-sm">Applied</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Export quality
              </label>
              <p className="text-foreground text-sm">High (1080p)</p>
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">
                Last modified
              </label>
              <p className="text-foreground text-sm">2024-01-15 14:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modify Button */}
      <div className="border-border flex-shrink-0 border-t px-4 py-3">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Settings className="mr-2 h-3 w-3" />
            Modify
          </Button>
        </div>
      </div>
    </div>
  );
}
