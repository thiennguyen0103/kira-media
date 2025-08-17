'use client';

import { VideoEditor } from '@/components/video-editor';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // In a real app, you would fetch project data here
    // For now, we'll use mock data
    setProject({
      id: projectId,
      name: `Project ${projectId}`,
      // Add other project properties as needed
    });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <VideoEditor />
    </main>
  );
}
