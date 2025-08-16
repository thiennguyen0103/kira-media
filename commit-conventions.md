# Commit Message Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This ensures consistent, readable commit history and enables automatic generation of changelogs.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

The type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that do not modify src or test files
- **revert**: Reverts a previous commit
- **deps**: Dependency updates
- **upgrade**: Upgrading dependencies or tools
- **security**: Security fixes
- **wip**: Work in progress

### Scope

The scope is optional but recommended. It should be the name of the component or area affected:

- `(video-editor)`: Changes to the main video editor component
- `(timeline)`: Changes to the timeline functionality
- `(sidebar)`: Changes to the sidebar component
- `(ui)`: Changes to UI components
- `(deps)`: Dependency-related changes
- `(build)`: Build system changes
- `(ci)`: CI/CD changes
- `(docs)`: Documentation changes

### Subject

- Use imperative mood: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No dot (.) at the end
- Keep it under 50 characters

### Body

- Use imperative mood: "change" not "changed" nor "changes"
- Include motivation for the change and contrast with previous behavior
- Wrap at 100 characters

### Footer

- Breaking changes should start with "BREAKING CHANGE: "
- Issues should be referenced by "Closes #123" or "Fixes #123"

## Examples

### Feature

```
feat(video-editor): add timeline scrubbing functionality

Add the ability to scrub through the timeline by clicking and dragging
on the timeline ruler. This provides a more intuitive way to navigate
through video content.

Closes #45
```

### Bug Fix

```
fix(timeline): resolve playhead positioning issue

The playhead was not correctly positioned when the timeline was zoomed
in. This fix ensures the playhead maintains its correct position
regardless of zoom level.

Fixes #67
```

### Documentation

```
docs(readme): update installation instructions

Update the README with the new Tailwind CSS v4 installation steps
and configuration details.
```

### Style

```
style(components): format code with prettier

Apply consistent code formatting across all component files using
prettier configuration.
```

### Refactor

```
refactor(sidebar): simplify tool selection logic

Extract tool selection logic into a custom hook for better
reusability and cleaner component code.
```

### Test

```
test(video-editor): add unit tests for timeline component

Add comprehensive unit tests for the timeline component including
playhead positioning, time updates, and user interactions.
```

### Chore

```
chore(deps): update commitlint to latest version

Update commitlint and related dependencies to their latest versions
for improved performance and new features.
```

### Build

```
build(tailwind): upgrade to v4 with new configuration

Migrate from Tailwind CSS v3 to v4 with updated PostCSS configuration
and new @theme directive syntax.
```

### CI

```
ci(github): add commitlint workflow

Add GitHub Actions workflow to automatically validate commit messages
and ensure they follow conventional commit standards.
```

### Dependencies

```
deps(package): update next.js to 15.4.6

Update Next.js to the latest version for improved performance and
new features.
```

### Upgrade

```
upgrade(tailwind): migrate from v3 to v4

Complete migration to Tailwind CSS v4 with new syntax and improved
performance characteristics.
```

### Security

```
security(auth): fix potential XSS vulnerability

Sanitize user input in authentication forms to prevent potential
XSS attacks.
```

### Work in Progress

```
wip(timeline): implement drag and drop functionality

Initial implementation of drag and drop for timeline clips. This
is a work in progress and not yet ready for production use.
```

## Breaking Changes

When introducing breaking changes, use the `!` notation in the type and include a "BREAKING CHANGE:" section in the footer:

```
feat(api)!: change authentication method

The authentication method has been changed from JWT tokens to OAuth2.
This is a breaking change that requires users to re-authenticate.

BREAKING CHANGE: Authentication now uses OAuth2 instead of JWT tokens.
Users will need to re-authenticate after this update.
```

## Using the Template

This project includes a Git commit message template. When you run `git commit` without the `-m` flag, the template will automatically open in your editor.

To use the template manually:

```bash
git commit -t .gitmessage
```

## Validation

Commit messages are automatically validated using commitlint. The validation runs:

1. **Pre-commit**: Via Husky hooks
2. **Manual**: Using `bun run commitlint:check`
3. **CI/CD**: In automated workflows

## Benefits

Following these conventions provides several benefits:

1. **Automatic Changelog Generation**: Tools can automatically generate changelogs from commit messages
2. **Better Git History**: Clear, structured commit history makes it easier to understand project evolution
3. **Automated Versioning**: Semantic versioning can be automated based on commit types
4. **Team Collaboration**: Consistent format makes it easier for team members to understand changes
5. **Code Review**: Clear commit messages improve the code review process

## Tools

This project uses the following tools to enforce commit conventions:

- **commitlint**: Validates commit messages
- **Husky**: Git hooks for pre-commit validation
- **Git Template**: Pre-filled commit message template

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [commitlint Documentation](https://commitlint.js.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)
