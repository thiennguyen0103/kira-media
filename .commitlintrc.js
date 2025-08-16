module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type rules
    'type-enum': [
      2,
      'always',
      [
        'feat', // New features
        'fix', // Bug fixes
        'docs', // Documentation changes
        'style', // Code style changes (formatting, missing semicolons, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Build process or auxiliary tool changes
        'ci', // CI/CD changes
        'revert', // Revert previous commits
        'build', // Build system changes
        'deps', // Dependency updates
        'upgrade', // Upgrading dependencies or tools
        'security', // Security fixes
        'wip', // Work in progress
      ],
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],

    // Scope rules
    'scope-case': [2, 'always', 'lowercase'],
    'scope-empty': [1, 'always'], // Scope is optional but recommended

    // Subject rules
    'subject-case': [2, 'always', 'lowercase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50],

    // Header rules
    'header-max-length': [2, 'always', 72],

    // Body rules
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
  prompt: {
    questions: {
      type: {
        description: 'Select the type of change you are committing:',
        enum: {
          feat: {
            description: '✨ A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '🐛 A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '📝 Documentation only changes',
            title: 'Documentation',
            emoji: '📝',
          },
          style: {
            description:
              '💄 Changes that do not affect the meaning of the code',
            title: 'Styles',
            emoji: '💄',
          },
          refactor: {
            description:
              '♻️ A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '♻️',
          },
          perf: {
            description: '⚡ A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '⚡',
          },
          test: {
            description: '🚨 Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              '👷 Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '👷',
          },
          ci: {
            description: '📦 Changes to CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '📦',
          },
          chore: {
            description:
              '🔧 Other changes that do not modify src or test files',
            title: 'Chores',
            emoji: '🔧',
          },
          revert: {
            description: '⏪ Reverts a previous commit',
            title: 'Reverts',
            emoji: '⏪',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
