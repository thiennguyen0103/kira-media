# Kira Media - Professional Video Editor

A modern, web-based video editing application built with Next.js, TypeScript, and shadcn/ui. Kira Media provides a professional video editing experience similar to CapCut, with an intuitive interface and powerful editing tools.

## ✨ Features

- **Professional Video Editing Interface**: Clean, modern UI designed for video editing workflows
- **Multi-Track Timeline**: Support for video, audio, and text tracks
- **Real-time Preview**: Live preview of your edits with playback controls
- **Tool Selection**: Various editing tools including select, cut, text, image, audio, and video
- **Responsive Design**: Works seamlessly across different screen sizes
- **Dark/Light Theme**: Built-in theme support with CSS variables
- **Modern Tech Stack**: Built with the latest web technologies

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Latest)
- **UI Components**: shadcn/ui v2.10.0
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, commitlint

## 📋 Prerequisites

- Node.js 18+ or Bun 1.0+
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd kira-media
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kira-media/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles and CSS variables (Tailwind v4)
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Main page component
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── header.tsx     # Application header
│   │   ├── sidebar.tsx    # Left sidebar with tools
│   │   ├── toolbar.tsx    # Top toolbar with controls
│   │   ├── preview.tsx    # Video preview area
│   │   ├── timeline.tsx   # Timeline component
│   │   └── video-editor.tsx # Main editor component
│   └── lib/               # Utility functions
├── public/                # Static assets
├── .husky/               # Git hooks
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .commitlintrc.js      # Commitlint configuration
├── .gitmessage           # Git commit message template
├── commitlint.config.js  # Alternative commitlint config
├── postcss.config.mjs    # PostCSS configuration for Tailwind v4
└── package.json          # Dependencies and scripts
```

## 🎯 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint errors
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting
- `bun run type-check` - Run TypeScript type checking
- `bun run commitlint` - Validate commit message
- `bun run commitlint:check` - Check last commit message

## 🎨 Customization

### Adding New UI Components

To add new shadcn/ui components:

```bash
bunx shadcn@latest add <component-name>
```

### Styling with Tailwind CSS v4

The application uses Tailwind CSS v4 with the new `@theme` directive for theming. Colors and other design tokens can be modified in:

- `src/app/globals.css` - CSS variables using `@theme` directive
- `tailwind.config.ts` - Tailwind configuration and custom theme

#### Tailwind CSS v4 Features

- **@theme directive**: Modern way to define CSS custom properties
- **@import "tailwindcss"**: Simplified import syntax
- **Improved performance**: Faster build times and smaller bundle sizes
- **Better CSS-in-JS support**: Enhanced integration with modern frameworks

### Adding New Tools

To add new editing tools, modify the `tools` array in `src/components/sidebar.tsx`:

```typescript
const tools = [
  // ... existing tools
  {
    id: 'new-tool',
    icon: NewIcon,
    label: 'New Tool',
    description: 'Description',
  },
];
```

## 🔧 Development

### Code Quality

The project includes several tools to maintain code quality:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting with Tailwind CSS v4 plugin
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files only
- **commitlint**: Enforce conventional commit message format

### Git Hooks

Pre-commit hooks automatically:

- Format code with Prettier
- Fix ESLint errors
- Ensure code quality before commits

Commit-msg hooks automatically:

- Validate commit message format using commitlint
- Ensure commits follow conventional commit standards

### Commit Message Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. See [commit-conventions.md](./commit-conventions.md) for detailed guidelines.

**Quick Examples:**

```bash
feat(video-editor): add timeline scrubbing functionality
fix(timeline): resolve playhead positioning issue
docs(readme): update installation instructions
style(components): format code with prettier
chore(deps): update dependencies
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

```bash
bun run build
bun run start
```

## 🔄 Recent Updates

### Tailwind CSS v4 Upgrade

- ✅ Upgraded from Tailwind CSS v3.4.17 to v4.1.12
- ✅ Updated PostCSS configuration for v4
- ✅ Migrated CSS variables to use `@theme` directive
- ✅ Updated configuration files for compatibility
- ✅ Verified build and development server functionality

### shadcn/ui

- ✅ Current version: v2.10.0
- ✅ All components compatible with Tailwind CSS v4
- ✅ No migrations required

### Commit Standards

- ✅ Added commitlint for conventional commit validation
- ✅ Configured Husky hooks for automatic validation
- ✅ Created commit message template
- ✅ Added comprehensive commit conventions documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following conventional commit standards
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Important**: All commits must follow the conventional commit format. The commitlint hook will automatically validate your commit messages.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework (v4)
- [Lucide](https://lucide.dev/) - Beautiful icons
- [commitlint](https://commitlint.js.org/) - Commit message validation

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using modern web technologies including Tailwind CSS v4
