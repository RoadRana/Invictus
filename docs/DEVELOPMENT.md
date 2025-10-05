# Development Guide

Detailed development setup and workflow for Invictus UMVS frontend.

## Environment Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: v2.30.0 or higher

### Installation

```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Verify installation
node --version  # Should be 18+
npm --version   # Should be 9+

# Clone repository
git clone https://github.com/your-org/invictus-frontend.git
cd invictus-frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

## Local Development

### Development Server

```bash
# Start dev server
npm run dev
# Runs on: http://localhost:5173

# Start with network access
npm run dev -- --host
# Access from other devices on your network
```

## Available Scripts

| Command               | Description              |
| --------------------- | ------------------------ |
| `npm run dev`         | Start dev server         |
| `npm run build`       | Build for production     |
| `npm run preview`     | Preview production build |
| `npm run lint`        | Check code quality       |
| `npm run format`      | Auto-format code         |
| `npm test`            | Run all tests            |
| `npm run ci:security` | Security audit           |

## Git Workflow

### Branch Naming Conventions

```
feature/user-authentication
feature/dashboard-analytics
```

```
bugfix/navbar-mobile-overflow
hotfix/payment-processing-error
```

```
chore/update-dependencies
docs/api-documentation
```

### Daily Workflow

```bash
# Morning: Get latest changes
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-feature

# Work and commit often
git add .
git commit -m "feat: add user login form"

# Keep branch updated
git fetch origin
git rebase origin/develop

# Push changes
git push origin feature/my-feature

# Open PR when ready
```

### Before Committing

```bash
# Run quality checks
npm run lint
npm run format
npm test
npm run build

# If all pass, commit!
git add .
git commit -m "feat: your feature"
```

## Code Style

### ESLint Configuration

Auto-configured via `.eslintrc.cjs`. Key rules:

- No unused variables
- React hooks rules enforced
- Prop types validation
- No console.logs in production

### Prettier Configuration

Auto-configured via `.prettierrc`. Settings:

- Single quotes
- 2-space indentation
- 80-character line width
- Trailing commas (ES5)
- Semicolons required

## VS Code Setup

Recommended `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Testing Guide

### Test Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx      # Component tests
│   │   └── index.js
│   └── ...
└── utils/
    ├── helpers.js
    └── helpers.test.js          # Unit tests
```

### Writing Tests

```javascript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits form with credentials', () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

## Debugging

### Browser DevTools

- **React DevTools**: Install browser extension
- **Redux DevTools**: If using Redux
- **Network Tab**: Monitor API calls
- **Console**: Check for errors

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
Build Errors
bash# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Performance Tips

- Use React DevTools Profiler
- Lazy load routes and components
- Optimize images before adding
- Monitor bundle size with npm run build
- Use React.memo for expensive components

## Security Best Practices

- Never commit .env files
- No hardcoded secrets
- Validate all user input
- Use HTTPS in production
- Keep dependencies updated

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
