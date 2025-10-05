# CI/CD Workflow Optimization

This document explains how to optimize our GitHub Actions workflows to run only when necessary, saving time and CI minutes while maintaining code quality.

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution: Path-Based Filtering](#the-solution-path-based-filtering)
- [Implementation Guide](#implementation-guide)
- [When to Run What](#when-to-run-what)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## The Problem

### Scenario: Documentation-Only PR

When you create a PR that only changes documentation:

```
Changes in this PR:
- README.md
- docs/CONTRIBUTING.md
- docs/DEVELOPMENT.md
```

**Current behavior:**

- ✅ Linting runs (unnecessary - no code changed)
- ✅ Tests run (unnecessary - no code changed)
- ✅ Build runs (unnecessary - no code changed)
- ✅ Security scan runs (unnecessary - no dependencies changed)

**Result:**

- 🕐 Wastes 3-5 minutes per PR
- 💰 Wastes CI minutes (limited on free tier)
- 😓 Slows down simple documentation updates

### Why This Happens

GitHub Actions workflows trigger on **any** change to the PR, regardless of which files changed. Without filtering, every workflow runs for every PR.

---

## The Solution: Path-Based Filtering

### How It Works

Use `paths` and `paths-ignore` filters in workflow triggers to run jobs **only when relevant files change**.

```yaml
on:
  pull_request:
    branches: [develop, main]
    paths:
      - 'src/**' # Only run if source code changes
      - 'package*.json' # Or if dependencies change
      - '.github/workflows/**' # Or if workflows change
```

### Benefits

- ✅ **Faster feedback** - Skip unnecessary checks
- ✅ **Save CI minutes** - Don't waste free tier quota
- ✅ **Better developer experience** - Docs PRs merge instantly
- ✅ **Clear intent** - Workflows show what they care about

---

## Implementation Guide

### Step 1: Updated `pr-ci.yml`

Replace your current workflow with this optimized version:

```yaml
name: Pull Request CI

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    branches: [develop, main]
    paths:
      # Run CI only when these paths change
      - 'src/**'
      - 'public/**'
      - 'package.json'
      - 'package-lock.json'
      - 'vite.config.js'
      - 'vitest.config.*.js'
      - '.eslintrc.cjs'
      - '.prettierrc'
      - 'tsconfig.json'
      - '.github/workflows/pr-ci.yml'
      # Add other config files as needed

permissions:
  contents: read
  pull-requests: write
  security-events: write

env:
  NODE_VERSION: '20'
  ONBOARDING_MODE: 'true'

jobs:
  quality-gates:
    name: Quality Gates
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      # ... rest of your workflow steps ...
```

### Step 2: Create Documentation-Only Workflow

Create `.github/workflows/docs-ci.yml` for documentation changes:

```yaml
name: Documentation CI

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [develop, main]
    paths:
      # Run only for documentation changes
      - '**.md'
      - 'docs/**'
      - '.github/PULL_REQUEST_TEMPLATE/**'
      - '.github/ISSUE_TEMPLATE/**'

permissions:
  contents: read
  pull-requests: write

jobs:
  lint-docs:
    name: Lint Documentation
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Check markdown formatting
        uses: DavidAnson/markdownlint-cli2-action@v14
        with:
          globs: |
            **/*.md
            !node_modules/**

      - name: Check for broken links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: 'yes'
          use-verbose-mode: 'no'
          config-file: '.markdownlint.json'

      - name: Spell check
        uses: rojopolis/spellcheck-github-actions@0.34.0
        with:
          config_path: .spellcheck.yml
          task_name: Markdown

      - name: Comment on PR
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const status = '${{ job.status }}';
            const emoji = status === 'success' ? '✅' : '❌';

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `${emoji} Documentation checks ${status}\n\nThis PR only changes documentation - no code quality checks needed.`
            });
```

### Step 3: Dependency-Only Workflow (Optional)

Create `.github/workflows/dependency-ci.yml` for dependency updates:

```yaml
name: Dependency Update CI

on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [develop, main]
    paths:
      - 'package.json'
      - 'package-lock.json'

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-check:
    name: Dependency Security Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit --audit-level=high

      - name: Check for outdated packages
        run: npm outdated || true

      - name: Build test
        run: npm run build
        env:
          NODE_ENV: production

      - name: Comment on PR
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const status = '${{ job.status }}';
            const emoji = status === 'success' ? '✅' : '❌';

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: `${emoji} Dependency update checks ${status}\n\nBuild and security checks completed for dependency changes.`
            });
```

---

## When to Run What

### File Path → Workflow Mapping

| Files Changed            | Workflow                    | Why                                   |
| ------------------------ | --------------------------- | ------------------------------------- |
| `src/**`, `package.json` | **pr-ci.yml** (full CI)     | Code changes need full quality checks |
| `*.md`, `docs/**`        | **docs-ci.yml** (docs only) | Only markdown linting needed          |
| `package.json` only      | **dependency-ci.yml**       | Security audit + build test           |
| `.github/workflows/**`   | **pr-ci.yml** (full CI)     | Workflow changes need testing         |
| `README.md` only         | **docs-ci.yml**             | Simple docs change                    |

### Decision Tree

```
PR opened
    ↓
What files changed?
    ├─ Only .md files? → Run docs-ci.yml only
    ├─ Only package*.json? → Run dependency-ci.yml only
    ├─ Any src/** files? → Run pr-ci.yml (full CI)
    ├─ Config files (.eslintrc, etc.)? → Run pr-ci.yml
    └─ Multiple types? → Run all relevant workflows
```

---

## Advanced Patterns

### Pattern 1: Exclude Specific Paths

```yaml
on:
  pull_request:
    paths:
      - 'src/**'
    paths-ignore:
      - 'src/**/*.test.js' # Ignore test file changes
      - 'src/**/*.md' # Ignore inline docs
```

### Pattern 2: Conditional Jobs

Run different jobs based on changed files:

```yaml
jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      src: ${{ steps.filter.outputs.src }}
      docs: ${{ steps.filter.outputs.docs }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            src:
              - 'src/**'
              - 'package*.json'
            docs:
              - '**.md'
              - 'docs/**'

  test-code:
    needs: detect-changes
    if: needs.detect-changes.outputs.src == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test

  lint-docs:
    needs: detect-changes
    if: needs.detect-changes.outputs.docs == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Lint markdown
        run: npx markdownlint '**/*.md'
```

### Pattern 3: Skip CI Entirely

For truly trivial changes (typos, comments), allow skipping:

```yaml
on:
  pull_request:
    branches: [develop, main]

jobs:
  ci:
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    runs-on: ubuntu-latest
    # ... rest of workflow
```

Usage:

```bash
git commit -m "docs: fix typo in README [skip ci]"
```

**⚠️ Warning:** Use sparingly! Only for truly trivial changes.

---

## Troubleshooting

### Workflow Doesn't Run When Expected

**Problem:** Changed `src/components/Button.jsx` but workflow didn't run.

**Solution:** Check if your `paths` filter includes that file:

```yaml
paths:
  - 'src/**' # ✅ This matches src/components/Button.jsx
```

### Workflow Runs Too Often

**Problem:** Workflow runs even for README changes.

**Solution:** Add more specific path filters:

```yaml
# Before (runs for everything)
on:
  pull_request:
    branches: [develop]

# After (runs only for code)
on:
  pull_request:
    branches: [develop]
    paths:
      - 'src/**'
      - 'package*.json'
```

### Multiple Workflows Running

**Problem:** Both `pr-ci.yml` and `docs-ci.yml` running for same PR.

**Solution:** This is **expected** if you changed both code and docs! Each workflow handles its file types.

To prevent overlap, use mutually exclusive paths:

```yaml
# pr-ci.yml
paths:
  - 'src/**'
  - 'package*.json'
  - '!**.md'  # Exclude markdown

# docs-ci.yml
paths:
  - '**.md'
  - 'docs/**'
```

### Workflow Skipped Unexpectedly

Check GitHub Actions tab → Click workflow → See skip reason:

```
This workflow run was skipped because the path filters
did not match any changed files.
```

This is **normal** and **good** - it means filtering is working!

---

## Best Practices

### 1. Start Broad, Then Narrow

```yaml
# Start with broad filter
paths:
  - 'src/**'
  - 'package*.json'

# Later, refine as needed
paths:
  - 'src/**'
  - '!src/**/*.md'  # Exclude docs
  - '!src/**/*.test.js'  # Exclude tests (if you have test-specific workflow)
  - 'package*.json'
```

### 2. Always Include Workflow Files

If you change the workflow itself, it should run:

```yaml
paths:
  - 'src/**'
  - '.github/workflows/pr-ci.yml' # ✅ Include self
```

### 3. Document Your Filters

Add comments explaining why each path is included:

```yaml
paths:
  - 'src/**' # Source code changes
  - 'package*.json' # Dependency changes
  - 'vite.config.js' # Build configuration
  - '.eslintrc.cjs' # Linting rules
  - '.github/workflows/pr-ci.yml' # Workflow changes
```

### 4. Test Your Filters

After adding path filters:

1. Create test PR with only docs changes → Workflow should skip
2. Create test PR with code changes → Workflow should run
3. Verify in Actions tab

### 5. Use Separate Workflows for Different Concerns

```
.github/workflows/
├── pr-ci.yml           # Code quality checks
├── docs-ci.yml         # Documentation checks
├── dependency-ci.yml   # Dependency updates
└── deploy.yml          # Deployment (no path filter)
```

### 6. Balance Granularity vs Complexity

**Too simple:**

```yaml
# Runs for everything
on:
  pull_request:
```

**Too complex:**

```yaml
# Hard to maintain
paths:
  - 'src/components/**/*.jsx'
  - 'src/components/**/*.js'
  - 'src/pages/**/*.jsx'
  - 'src/utils/**/*.js'
  # ... 20 more lines ...
```

**Just right:**

```yaml
# Clear and maintainable
paths:
  - 'src/**'
  - 'package*.json'
  - '.github/workflows/pr-ci.yml'
```

---

## Real-World Examples

### React Repository

```yaml
# Simplified from facebook/react
on:
  pull_request:
    paths:
      - 'packages/**'
      - 'scripts/**'
      - '.github/workflows/runtime_test.yml'
```

### Next.js Repository

```yaml
# Simplified from vercel/next.js
on:
  pull_request:
    paths-ignore:
      - 'docs/**'
      - 'examples/**'
      - '**.md'
```

### Vue Repository

```yaml
# Simplified from vuejs/core
on:
  pull_request:
    paths:
      - 'packages/**'
      - 'scripts/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
```

---

## Migration Checklist

Migrating from unfiltered to filtered workflows:

- [ ] Identify file types in your repo
- [ ] Map file types to required checks
- [ ] Update `pr-ci.yml` with path filters
- [ ] Create `docs-ci.yml` for documentation
- [ ] Test with docs-only PR (should skip pr-ci)
- [ ] Test with code PR (should run pr-ci)
- [ ] Test with mixed PR (both workflows run)
- [ ] Update documentation (this file!)
- [ ] Notify team about new behavior

---

## FAQ

### Q: Will path filters break required status checks?

**A:** No, but configure branch protection carefully:

```
Branch protection rules:
☑ Require status checks to pass before merging
☑ Status checks that are required:
  - Quality Gates (from pr-ci.yml)

Don't require:
  - Documentation CI (from docs-ci.yml)
  - Dependency CI (from dependency-ci.yml)
```

Only require workflows that **always** need to run.

### Q: What if I change both code and docs?

**A:** Both workflows run - that's correct behavior! Each workflow checks its file types.

### Q: Should I use path filters on deployment workflows?

**A:** Usually **no**. Deployments should run for any change to the branch:

```yaml
# deploy.yml - NO path filter
on:
  push:
    branches: [main, develop]
  # No paths: filter - deploy everything
```

### Q: Can I test path filters locally?

**A:** Not directly, but you can:

1. Use `act` (GitHub Actions local runner)
2. Create test PRs on GitHub
3. Check workflow syntax with `actionlint`

### Q: What about dependencies in package-lock.json?

**A:** Include it:

```yaml
paths:
  - 'package.json'
  - 'package-lock.json' # ✅ Include lock file
```

Lock file changes mean dependency updates.

---

## Summary

### Key Takeaways

1. **Use path filters** to run workflows only when relevant files change
2. **Separate workflows** for different concerns (code, docs, dependencies)
3. **Start simple** and refine over time
4. **Test your filters** with different PR types
5. **Document your decisions** for future maintainers

### Quick Reference

```yaml
# Code changes only
paths:
  - 'src/**'
  - 'package*.json'
  - '.github/workflows/pr-ci.yml'

# Documentation only
paths:
  - '**.md'
  - 'docs/**'

# Exclude everything except code
paths-ignore:
  - 'docs/**'
  - '**.md'
  - 'examples/**'
```

### Next Steps

1. Apply path filters to `pr-ci.yml`
2. Create `docs-ci.yml` workflow
3. Test with different PR types
4. Update team documentation
5. Configure branch protection rules

---

**Last Updated:** 2025
**Maintainer:** Invictus DevOps Team
**Related Docs:** [CI/CD Pipeline](CI_CD.md), [Contributing Guide](../CONTRIBUTING.md)
