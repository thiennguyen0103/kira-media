'use client';

import { Button } from '@/components/ui/button';
import { Menu, Crown, Share2, Download, X } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background border-border border-b">
      {/* Main Header Bar */}
      <div className="flex h-14 items-center px-6">
        {/* Left Side - CapCut Style */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-sm font-medium"
          >
            <Menu className="mr-2 h-4 w-4" />
            Menu
          </Button>
          <div className="bg-border h-6 w-px"></div>
          <h1 className="text-foreground text-xl font-bold">CapCut</h1>
        </div>

        {/* Center - Project Name - CapCut Style */}
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-muted border-border rounded-lg border px-4 py-2">
            <h2 className="text-foreground text-base font-semibold">0729</h2>
          </div>
        </div>

        {/* Right Side - Actions - CapCut Style */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-sm font-medium"
          >
            <Crown className="mr-2 h-4 w-4" />
            Pro
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-sm font-medium"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary h-9 border px-4 text-sm font-medium shadow-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
