'use client';

import { Button } from '@/components/ui/button';
import { Settings, Info } from 'lucide-react';

export function DetailsPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="px-4 py-3 border-b border-border flex-shrink-0">
        <h3 className="text-sm font-medium text-foreground">Details</h3>
      </div>
      
      {/* Project Properties - Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground font-medium">Name</label>
              <p className="text-sm text-foreground">0729</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Path</label>
              <p className="text-xs text-foreground break-all">
                C:/Users/Kira/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/0729
              </p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Aspect ratio</label>
              <p className="text-sm text-foreground">Original</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Resolution</label>
              <p className="text-sm text-foreground">Adapted</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Frame rate</label>
              <p className="text-sm text-foreground">30.00fps</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Imported media</label>
              <p className="text-sm text-foreground">Stay in original location</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Proxy</label>
                <p className="text-sm text-foreground">Turned on</p>
              </div>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Arrange layers</label>
                <p className="text-sm text-foreground">Turned off</p>
              </div>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Additional properties to demonstrate scrolling */}
            <div>
              <label className="text-xs text-muted-foreground font-medium">Project duration</label>
              <p className="text-sm text-foreground">00:05:30</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Total clips</label>
              <p className="text-sm text-foreground">24</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Audio tracks</label>
              <p className="text-sm text-foreground">3</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Video tracks</label>
              <p className="text-sm text-foreground">2</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Effects applied</label>
              <p className="text-sm text-foreground">12</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Transitions</label>
              <p className="text-sm text-foreground">8</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Text overlays</label>
              <p className="text-sm text-foreground">5</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Color grading</label>
              <p className="text-sm text-foreground">Applied</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Export quality</label>
              <p className="text-sm text-foreground">High (1080p)</p>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground font-medium">Last modified</label>
              <p className="text-sm text-foreground">2024-01-15 14:30</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modify Button */}
      <div className="px-4 py-3 border-t border-border flex-shrink-0">
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
