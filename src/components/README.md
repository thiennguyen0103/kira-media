# Project Components

This directory contains reusable components for displaying and managing projects in the Kira Media application.

## Components Overview

### Main Components

- **`ProjectList`** - Complete project list page with all functionality
- **`ProjectHeader`** - Header with title and new project button
- **`ProjectStatsBar`** - Statistics bar showing project counts and duration
- **`ProjectFilters`** - Search, filters, and view mode controls

### Display Components

- **`ProjectCard`** - Individual project card for grid view
- **`ProjectListItem`** - Individual project item for list view
- **`ProjectGrid`** - Grid layout container
- **`ProjectListView`** - List layout container

### Utility Components

- **`LoadingState`** - Loading spinner and message
- **`EmptyState`** - Empty state when no projects found
- **`Pagination`** - Load more projects button

## Usage Examples

### Basic Project List

```tsx
import { ProjectList } from '@/components/project-list';

export default function MyPage() {
  return <ProjectList />;
}
```

### Customized Project List

```tsx
import { ProjectList } from '@/components/project-list';

export default function MyPage() {
  const handleNewProject = () => {
    // Custom new project logic
  };

  return (
    <ProjectList
      title="My Projects"
      showNewProjectButton={true}
      onNewProject={handleNewProject}
      className="custom-class"
    />
  );
}
```

### Individual Components

```tsx
import {
  ProjectHeader,
  ProjectStatsBar,
  ProjectFilters,
  ProjectGrid,
} from '@/components';

export default function CustomProjectPage() {
  return (
    <div>
      <ProjectHeader title="Custom Title" />
      <ProjectStatsBar stats={projectStats} />
      <ProjectFilters {...filterProps} />
      <ProjectGrid {...gridProps} />
    </div>
  );
}
```

## Props and Interfaces

All components use shared types defined in `@/lib/types/project`:

- `Project` - Project data interface
- `ProjectStats` - Statistics data interface
- `ProjectFilters` - Filter options interface

## Shared Utilities

Common helper functions are available in `@/lib/utils/project-utils`:

- `formatDuration()` - Format seconds to HH:MM:SS
- `formatResolution()` - Format width x height
- `getStatusColor()` - Get CSS classes for status
- `getStatusLabel()` - Get human-readable status label

## Styling

Components follow the shadcn design system and use Tailwind CSS classes. All components are fully responsive and support both light and dark themes.

## Customization

Components are designed to be flexible and customizable:

- Most components accept `className` props for additional styling
- Event handlers can be customized via callback props
- Content can be customized via props (titles, messages, etc.)
- View modes (grid/list) can be controlled externally
