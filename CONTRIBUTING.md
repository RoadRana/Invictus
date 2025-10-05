# Contributing to Invictus UMVS

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)

---

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Help create a welcoming environment

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/invictus-frontend.git
cd invictus-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens

## 🔄 Development Workflow

### Branch Strategy (Git Flow)

We use Git Flow with these branches:

`main` - Production code (protected)
`develop` - Staging code (protected)
`feature/_` - New features
`bugfix/_` - Bug fixes
`hotfix/\*` - Urgent production fixes

### Creating a Feature

```bash
# 1. Always start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch

git checkout -b feature/short-description

# 3. Work on your feature

# Make commits with clear messages

# 4. Keep your branch updated

git fetch origin
git rebase origin/develop

# 5. Push your branch

git push origin feature/short-description

# 6. Open Pull Request to develop
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:

`feat`: New feature
`fix`: Bug fix
`docs`: Documentation changes
`style`: Code style changes (formatting, etc.)
`refactor`: Code refactoring
`test`: Adding or updating tests
`chore`: Maintenance tasks

### Examples:

```
feat(auth): add login form validation

fix(navbar): resolve mobile menu overflow issue

docs(readme): update installation instructions

test(dashboard): add unit tests for analytics component
```

## 📏 Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```jsx
// ✅ Good
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
};

// ❌ Bad
const UP = ({ id }) => {
  const [u, setU] = useState(null);
  useEffect(() => {
    fetchUser(id).then(setU);
  }, [id]);
  return <div>{u?.name}</div>;
};
```

### Styling (Tailwind CSS)

- Use Tailwind utility classes
- Group related classes
- Use components for repeated patterns
- Follow mobile-first approach

```jsx
// ✅ Good
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Click Me
</button>

// ❌ Bad (custom CSS when Tailwind available)
<button style={{padding: '8px 16px', background: 'blue'}}>
Click Me
</button>
```

### File Structure

```
src/
├── components/ # Reusable components
│ ├── common/ # Shared components (Button, Input, etc.)
│ └── layout/ # Layout components (Header, Footer, etc.)
├── pages/ # Page components
├── hooks/ # Custom React hooks
├── utils/ # Utility functions
├── services/ # API services
├── assets/ # Images, fonts, etc.
└── styles/ # Global styles
```

### Linting & Formatting

```bash
# Run linter
npm run lint

# Auto-fix linting issues

npm run lint -- --fix

# Format code

npm run format

# Check formatting

npm run format:check
```

**Pre-commit**: Always run linting and formatting before committing!

## 🧪 Testing Requirements

### Test Coverage Goals

- Unit Tests: All utility functions and hooks
- Component Tests: All UI components
- Integration Tests: User flows and API interactions

### Writing Tests

```javascript
// Example component test
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    screen.getByText('Click Me').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode

npm run test:watch

# Run unit tests only

npm run test:unit

# Run integration tests only

npm run test:integration

# Generate coverage report

npm run test:coverage
```

## 🔀 Pull Request Process

### Before Creating a PR

Code follows style guidelines
All tests pass locally
Linting passes (npm run lint)
Formatting is correct (npm run format:check)
Documentation updated (if needed)
No console.logs or debug code

### Creating the PR

1. Push your branch to GitHub
2. Open Pull Request to develop branch
3. Choose appropriate PR template
4. Fill out all sections of the template
5. Add screenshots for UI changes
6. Request review from team members

### PR Title Format

```
<type>: <brief description>

Examples:
feat: Add user authentication flow
fix: Resolve mobile navigation bug
docs: Update API documentation
```

### PR Description Checklist

Use the provided PR templates. Always include:

- What changed and why
- How to test the changes
- Screenshots (for UI changes)
- Related issue numbers

### Review Process

Automated checks run (CI/CD pipeline)
Code review by at least 1 team member
Address feedback and update PR
Final approval from reviewer
Merge by PR author or maintainer

### After Merge

- Feature branch is automatically deleted
- Staging deployment triggers automatically
- Monitor staging for issues
- If issues: rollback immediately

## 🤖 CI/CD Pipeline

## Automated Checks

Every PR runs these checks:
CheckToolEnforcementLintingESLintOnboarding modeFormattingPrettierOnboarding modeUnit TestsVitestOnboarding modeIntegration TestsVitestOnboarding modeSecurity Scannpm audit, TrivyWarning onlyBuildViteAlways required ✅

## Onboarding Mode

Currently in **onboarding mode**:

- All checks run and report results
- Only **build failures** block merging
- Team can fix issues gradually
- Transition to strict mode planned

## Build Artifacts

- Every PR generates a build artifact
- Available for 7 days
- Download from Actions tab
- Test before merging

## Local Testing

Run all CI checks locally before pushing:

```bash
# Run complete CI check locally
npm run lint && \
npm run format:check && \
npm run ci:security && \
npm test && \
npm run build

# If all pass, your PR will pass CI ✅
```

## 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots
- Browser/OS information

## ✨ Requesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- Feature description
- Problem it solves
- Proposed solution
- Alternatives considered

## 📞 Getting Help

- **Technical questions**: Ask in team Slack (#invictus-dev)
- **Bug reports**: Create a GitHub issue
- **General discussion**: Use GitHub Discussions
- **Urgent issues**: Contact Tech Lead directly

## 📚 Additional Resources

- [Development Guide](/docs/DEVELOPMENT.md)
- [CI/CD Documentation](/docs/CI_CD.md)
- [Deployment Guide](/docs/DEPLOYMENT.md)
- [Architecture Overview](/docs/ARCHITECTURE.md)

Thank you for contributing to Invictus UMVS! 🚀
