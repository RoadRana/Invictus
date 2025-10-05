# CI/CD Pipeline Documentation

**Last Updated:** 2025  
**Maintainer:** DevOps Team  
**Audience:** All developers

---

## Table of Contents

- [Overview](#overview)
- [Our Branching Strategy](#our-branching-strategy)
- [Complete Workflow](#complete-workflow)
- [Workflow Files Explained](#workflow-files-explained)
- [Developer Workflow Guide](#developer-workflow-guide)
- [Environments](#environments)
- [Testing Your Changes](#testing-your-changes)
- [Emergency Procedures](#emergency-procedures)
- [Troubleshooting](#troubleshooting)
- [GitHub Actions Tips](#github-actions-tips)
- [Further Reading](#further-reading)

---

## Overview

### What is CI/CD?

**CI (Continuous Integration):** Automatically test and validate code changes when you create pull requests.

**CD (Continuous Deployment):** Automatically deploy passing code to staging and production environments.

### Our CI/CD Goals

✅ **Fast Feedback** - Know within minutes if your code breaks something  
✅ **Consistent Quality** - Every PR goes through the same quality checks  
✅ **Safe Deployments** - Automatic rollback if something goes wrong  
✅ **Developer Confidence** - Test in staging before production  
✅ **Audit Trail** - Every deployment is tracked and tagged

### Architecture Overview

```
GitHub Repository
    ↓
GitHub Actions (Automated Workflows)
    ↓
AWS Infrastructure
    ├── Staging: staging.invictusumvs.net
    └── Production: invictusumvs.net
```

**Technology Stack:**

- **Source Control:** GitHub (Git Flow branching)
- **CI/CD Platform:** GitHub Actions
- **Hosting:** AWS S3 + CloudFront
- **Build Tool:** Vite (React)
- **Testing:** Vitest, ESLint, Prettier

---

## Our Branching Strategy

We use **Git Flow**, a proven branching model for managing releases:

```
feature branches → develop → main
   (work here)   (staging)  (production)
```

### Branch Purposes

| Branch      | Purpose                   | Deploy To      | Who Can Push |
| ----------- | ------------------------- | -------------- | ------------ |
| `feature/*` | Individual features/fixes | None           | Developers   |
| `develop`   | Integration branch        | **Staging**    | Via PR only  |
| `main`      | Production-ready code     | **Production** | Via PR only  |

### Branch Protection Rules

**`develop` branch:**

- ✅ Requires PR approval
- ✅ Must pass all CI checks
- ❌ No direct pushes

**`main` branch:**

- ✅ Requires PR approval (2+ reviewers recommended)
- ✅ Must be up-to-date with base branch
- ❌ No direct pushes
- ⚠️ This is your "production gate"

---

## Complete Workflow

### Visual Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Developer creates feature branch                             │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Opens PR: feature → develop                                  │
│    • pr-ci.yml runs automatically                               │
│    • Quality gates: lint, test, build                           │
│    • Creates artifact for review                                │
│    • ⚠️ Cannot merge until checks pass                          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼ (Approved & Merged)
┌─────────────────────────────────────────────────────────────────┐
│ 3. Merge to develop triggers deploy-staging.yml                 │
│    🚀 AUTO-DEPLOY TO STAGING                                    │
│    • Build fresh from develop                                   │
│    • Backup current staging                                     │
│    • Deploy to staging.invictusumvs.net                         │
│    • Invalidate CloudFront                                      │
│    • Run smoke tests                                            │
│    • ✅ OR ❌ Auto-rollback on failure                          │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ (Team tests on staging)
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. When ready, open PR: develop → main                          │
│    • Manual review/approval required                            │
│    • Product owner verifies staging                             │
│    • ⚠️ This is the "production gate"                           │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼ (Approved & Merged)
┌─────────────────────────────────────────────────────────────────┐
│ 5. Merge to main triggers deploy-production.yml                 │
│    🎉 AUTO-DEPLOY TO PRODUCTION                                 │
│    • Build fresh from main                                      │
│    • Backup current production (timestamped)                    │
│    • Deploy to invictusumvs.net                                 │
│    • Invalidate CloudFront                                      │
│    • Run comprehensive health checks                            │
│    • ✅ Tag release OR ❌ Auto-rollback on failure              │
└─────────────────────────────────────────────────────────────────┘
```

### Timeline Example

**Monday 10:00 AM** - Start feature  
**Monday 3:00 PM** - Open PR → CI runs (~3 min)  
**Monday 3:30 PM** - PR approved, merge to develop  
**Monday 3:35 PM** - Staging deployed automatically (~2 min)  
**Monday-Tuesday** - Team tests on staging  
**Wednesday 9:00 AM** - Open PR: develop → main  
**Wednesday 10:00 AM** - PR approved, merge to main  
**Wednesday 10:05 AM** - Production deployed automatically (~3 min)

**Total time from code to production: ~2 days** (with testing time)

---

## Workflow Files Explained

Our CI/CD is powered by GitHub Actions workflows located in `.github/workflows/`:

### 1. `pr-ci.yml` - Pull Request Quality Gates

**Triggers:** Every PR to `develop` or `main`

**What it does:**

- ✅ Linting (ESLint)
- ✅ Code formatting check (Prettier)
- ✅ Type checking (TypeScript)
- ✅ Unit tests
- ✅ Integration tests
- ✅ Security audit
- ✅ Build verification
- 📦 Creates build artifact for review

**Enforcement Level:**

- 🔴 **Build must pass** (always required)
- 🟡 **Quality checks** (currently in onboarding mode - informational only)
- 🟢 **Security audit** (warnings only)

**Duration:** ~3-5 minutes

**What you'll see:**

```
✅ Pull Request CI
  ├── ✅ Build application
  ├── ⚠️ Run linting (not blocking in onboarding mode)
  ├── ⚠️ Check code formatting
  ├── ✅ Run unit tests
  ├── ✅ Run integration tests
  └── 📦 Upload build artifacts
```

### 2. `docs-ci.yml` - Documentation Quality Checks

**Triggers:** PRs that only change documentation files (`.md`, `docs/**`)

**What it does:**

- ✅ Markdown linting
- ✅ Spell checking
- ✅ Broken link detection

**Why separate?**

- Faster feedback for docs-only changes
- Don't need to run full test suite for typo fixes

**Duration:** ~30 seconds

### 3. `deploy-staging.yml` - Staging Deployment

**Triggers:**

- Automatic: Push to `develop` branch (after PR merge)
- Manual: Via GitHub Actions UI

**What it does:**

1. Builds fresh from `develop`
2. Backs up current staging
3. Deploys to `staging.invictusumvs.net`
4. Invalidates CloudFront cache
5. Runs smoke tests
6. Auto-rollback if tests fail
7. Tags successful deployments

**Duration:** ~2-3 minutes

**Success criteria:**

- ✅ Site loads at https://staging.invictusumvs.net
- ✅ SPA routing works
- ✅ HTTPS redirect works

**On failure:**

- ❌ Automatic rollback to previous version
- 🚨 Alerts team (if Slack configured)

### 4. `deploy-production.yml` - Production Deployment

**Triggers:**

- Automatic: Push to `main` branch (after PR merge)
- Manual: Via GitHub Actions UI for emergency actions

**What it does:**

1. Builds fresh from `main`
2. Creates timestamped backup
3. Deploys to `invictusumvs.net`
4. Invalidates CloudFront cache
5. Runs comprehensive health checks
6. Auto-rollback if health checks fail
7. Tags release with version number

**Duration:** ~3-4 minutes

**Success criteria:**

- ✅ Main domain loads (invictusumvs.net)
- ✅ WWW subdomain loads (www.invictusumvs.net)
- ✅ SPA routing works
- ✅ HTTPS redirect works
- ✅ Response time < 3 seconds

**On failure:**

- ❌ Automatic rollback to previous version
- 🚨 Alerts team immediately

**Manual Actions:**

- **Deploy** - Re-deploy current main branch
- **Emergency Rollback** - Restore previous production version

---

## Developer Workflow Guide

### Starting a New Feature

```bash
# 1. Start from latest develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/add-user-dashboard

# 3. Make your changes
# ... code, code, code ...

# 4. Commit frequently
git add .
git commit -m "feat: add user dashboard layout"

# 5. Push to GitHub
git push origin feature/add-user-dashboard
```

### Creating a Pull Request

1. **Go to GitHub** and open a PR: `feature/add-user-dashboard` → `develop`

2. **Fill out PR template:**
   - What does this PR do?
   - How to test?
   - Screenshots (if UI changes)

3. **Wait for CI checks:**

   ```
   Pull Request CI / Quality Gates (pull_request)
   Expected — Waiting for status to be reported
   ```

4. **CI runs automatically:**
   - Watch checks in PR "Checks" tab
   - Fix any failures by pushing new commits
   - Each new commit triggers CI again

5. **Request review:**
   - Add reviewers
   - Link to related issues

### After PR is Approved

```bash
# When approved, merge the PR on GitHub
# (Use "Squash and merge" for clean history)

# Then:
git checkout develop
git pull origin develop

# Watch GitHub Actions deploy to staging:
# https://github.com/InvictusUMVs/invictus-frontend/actions

# Test on staging:
# https://staging.invictusumvs.net
```

**Within 2-3 minutes, your changes are live on staging!**

### Promoting to Production

When staging is stable and ready:

```bash
# 1. Create production PR
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Open PR: release/v1.2.0 → main
# Title: "Release v1.2.0"
# Description: Summary of changes since last production

# 3. Get approval from:
# - Product owner
# - Tech lead
# - At least one senior developer

# 4. Merge to main
# Production deploys automatically!
```

**Within 3-4 minutes, your changes are live in production!**

---

## Environments

### Staging Environment

**URL:** https://staging.invictusumvs.net

**Purpose:**

- Test features before production
- QA testing
- Stakeholder demos
- Integration testing

**Updates:**

- Automatically on every merge to `develop`
- Always reflects latest `develop` branch

**When to use:**

- "Can you test this feature?"
- "Does this work on mobile?"
- "Let's show the client this prototype"

**Data:**

- Use test data only
- Not connected to production database
- Safe to break/experiment

### Production Environment

**URL:** https://invictusumvs.net (and www.invictusumvs.net)

**Purpose:**

- Live site for real users
- Must be stable and reliable

**Updates:**

- Only via `main` branch (requires approval)
- Thoroughly tested on staging first

**When to use:**

- When features are complete and tested
- After stakeholder sign-off
- For scheduled releases

**Data:**

- Real user data
- Handle with care
- Monitored 24/7

---

## Testing Your Changes

### Local Testing (Before PR)

```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format

# Run tests
npm run test:unit
npm run test:integration

# Build to catch build errors
npm run build
```

**Pro tip:** Set up a pre-commit hook to run these automatically!

### Testing on Staging

**After your PR merges to `develop`:**

1. **Wait for deployment** (~2 min)
   - Watch GitHub Actions: https://github.com/InvictusUMVs/invictus-frontend/actions
   - Look for green checkmark on `Deploy to Staging`

2. **Test manually:**

   ```
   https://staging.invictusumvs.net
   ```

3. **Test different scenarios:**
   - Desktop browsers (Chrome, Firefox, Safari)
   - Mobile browsers (iOS Safari, Android Chrome)
   - Different screen sizes
   - Different user roles/permissions
   - Edge cases

4. **Check browser console:**
   - No JavaScript errors
   - No 404s for assets
   - API calls working

5. **Performance check:**
   - Pages load quickly
   - No layout shifts
   - Images load properly

### Testing Checklist

Before merging to production, verify:

- [ ] Feature works as expected on staging
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Works in major browsers (Chrome, Firefox, Safari)
- [ ] No broken links
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Loading states work
- [ ] Error states work
- [ ] Stakeholder approval obtained

---

## Emergency Procedures

### Production is Broken - What Do I Do?

**Don't Panic!** We have automatic rollback systems.

#### If Deployment Just Failed

✅ **Good news:** Rollback already happened automatically!

1. Check GitHub Actions: https://github.com/InvictusUMVs/invictus-frontend/actions
2. Look for the failed deployment
3. Click into the workflow run
4. Check the "Rollback on failure" step
5. Verify production is back to previous version

**Next steps:**

1. Fix the issue in a new branch
2. Test thoroughly on staging
3. Create new PR to main

#### If Production is Broken After Successful Deployment

🚨 **Manual rollback needed**

1. **Go to GitHub Actions:**

   ```
   Repository → Actions → Deploy to Production → Run workflow
   ```

2. **Select rollback action:**
   - Branch: `main`
   - Action: `emergency-rollback`
   - Click "Run workflow"

3. **Approve rollback:**
   - Requires approval from senior team member
   - Approval required to prevent accidents

4. **Wait for rollback:**
   - Takes ~2-3 minutes
   - Restores previous production version
   - Invalidates CloudFront cache

5. **Verify production is restored:**
   ```
   https://invictusumvs.net
   ```

**Post-mortem:**

1. Document what went wrong
2. Fix the issue
3. Add tests to prevent recurrence
4. Deploy fix through normal process (develop → staging → main)

### Rollback Troubleshooting

**"No backup available"**

- First deployment ever? No backup exists yet
- Backups cleared? Check S3 backup bucket
- **Action:** Deploy last known good commit manually

**"Rollback failed"**

- Check AWS permissions
- Check S3 bucket exists
- Check CloudFront distribution ID
- **Action:** Contact DevOps team

**"Site still broken after rollback"**

- CloudFront cache may take time to propagate
- Wait 5-10 minutes
- Try in incognito/private browsing mode
- **Action:** Manual CloudFront invalidation may be needed

---

## Troubleshooting

### Common Issues

#### PR CI Checks Failing

**Linting errors:**

```bash
# Fix automatically
npm run lint:fix

# Check what's wrong
npm run lint
```

**Formatting errors:**

```bash
# Fix automatically
npm run format

# Check what's wrong
npm run format:check
```

**Test failures:**

```bash
# Run tests locally
npm run test:unit

# Run specific test file
npm run test:unit -- path/to/test.test.js

# Run tests in watch mode
npm run test:unit -- --watch
```

**Build failures:**

```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build

# Check for errors
```

**Type errors (TypeScript):**

```bash
# Check types
npm run type-check

# Common fixes:
# - Add missing type annotations
# - Install missing @types packages
# - Fix type mismatches
```

#### Staging Deployment Failed

1. **Check GitHub Actions logs:**
   - Repository → Actions → Deploy to Staging
   - Click the failed workflow
   - Expand failed steps

2. **Common causes:**
   - Build failure (check build logs)
   - AWS credentials issue (check with DevOps)
   - S3 bucket issue (check with DevOps)
   - CloudFront issue (check with DevOps)

3. **What to do:**
   - If build failure: Fix code and push to develop
   - If AWS issue: Contact DevOps team
   - If urgent: Manual deployment possible (ask DevOps)

#### Staging Shows Old Version

**Likely cause:** CloudFront cache

**Solution:**

```bash
# Wait 5-10 minutes for cache invalidation
# OR
# Force refresh in browser:
# - Chrome/Firefox: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# - Try incognito/private mode
```

#### Production Deployment Waiting Forever

**Likely cause:** Waiting for approval

**Check:**

1. Repository → Actions → Deploy to Production
2. Look for yellow "Waiting" status
3. Check "Review deployments" button

**Solution:**

- Get required approvals from team
- Production requires manual approval (by design)

#### Changes Not Visible on Production

**Troubleshooting steps:**

1. **Check deployment succeeded:**
   - GitHub Actions → Deploy to Production → ✅ Green

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Try incognito/private mode
   - Try different browser

3. **Check actual files on CDN:**

   ```bash
   # Check what's deployed
   curl -I https://invictusumvs.net/

   # Check specific file
   curl https://invictusumvs.net/assets/main.js
   ```

4. **Wait for CloudFront:**
   - Can take 10-15 minutes for global propagation
   - Check deployment time in GitHub Actions

### Getting Help

**For CI/CD Issues:**

1. Check this documentation first
2. Check GitHub Actions logs
3. Ask in #dev-ops Slack channel
4. Tag @devops-team

**For Code Issues:**

1. Run tests locally
2. Check linting and formatting
3. Ask in #engineering Slack channel
4. Request code review

**For Emergency:**

1. Page on-call engineer
2. Use #critical-alerts Slack channel
3. Follow emergency rollback procedure

---

## GitHub Actions Tips

### Viewing Workflow Runs

1. **Go to Actions tab:** https://github.com/InvictusUMVs/invictus-frontend/actions

2. **Filter by workflow:**
   - Click workflow name in left sidebar
   - "Pull Request CI" - see all PR checks
   - "Deploy to Staging" - see staging deployments
   - "Deploy to Production" - see production deployments

3. **View specific run:**
   - Click on workflow run
   - See all jobs and steps
   - Expand steps to see logs

### Re-running Failed Workflows

**For PR checks:**

1. Fix the issue in your code
2. Push new commit
3. CI runs automatically

**For deployments:**

1. Actions → Failed workflow
2. Click "Re-run jobs"
3. Select "Re-run failed jobs" or "Re-run all jobs"

### Downloading Build Artifacts

**Why?** Test the exact build that will be deployed

**How:**

1. Actions → Pull Request CI → Your PR
2. Scroll to "Artifacts" section at bottom
3. Download `pr-build-XXXX.zip`
4. Extract and open `dist/index.html` in browser

### Manual Workflow Triggers

Some workflows can be triggered manually:

1. **Actions → Select workflow**
2. **Click "Run workflow"**
3. **Select options:**
   - Branch
   - Action (if applicable)
4. **Click "Run workflow"**

**Use cases:**

- Emergency rollback
- Manual staging deployment
- Re-deploy production

### Understanding Workflow Status

| Icon | Status          | Meaning                         |
| ---- | --------------- | ------------------------------- |
| 🟡   | In progress     | Workflow is running             |
| ✅   | Success         | All steps passed                |
| ❌   | Failure         | One or more steps failed        |
| ⏸️   | Cancelled       | Manually cancelled              |
| ⏭️   | Skipped         | Workflow skipped (path filters) |
| ⏳   | Queued          | Waiting to run                  |
| 🔵   | Action required | Waiting for approval            |

---

## Further Reading

### Advanced Topics

**[Workflow Optimization Guide](CI_CD_Optimization.md)**

- Path-based filtering for faster CI
- When to run what workflows
- Optimizing for cost and speed
- Advanced GitHub Actions patterns

**[GitHub Secrets Configuration](GitHub_Secrets.md)**

- Setting up AWS credentials
- Environment-specific secrets
- Security best practices
- Rotating secrets

**[AWS Infrastructure Guide](AWS_Infrastructure.md)**

- S3 + CloudFront architecture
- SSL certificate management
- DNS configuration
- Cost optimization

### External Resources

**Git Flow:**

- [Original Git Flow Post](https://nvie.com/posts/a-successful-git-branching-model/)
- [Atlassian Git Flow Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

**GitHub Actions:**

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

**Best Practices:**

- [The Twelve-Factor App](https://12factor.net/)
- [Google SRE Book](https://sre.google/books/)

---

## Summary

### Quick Reference

**I want to...**

| Task                    | Action                                               |
| ----------------------- | ---------------------------------------------------- |
| Start new feature       | `git checkout -b feature/name` from `develop`        |
| Test my changes locally | `npm run lint && npm test && npm run build`          |
| Create PR               | Open PR to `develop` on GitHub                       |
| View CI results         | GitHub PR → Checks tab                               |
| Test on staging         | Wait for deploy, then visit staging.invictusumvs.net |
| Deploy to production    | Create PR: `develop` → `main`                        |
| Rollback production     | Actions → Deploy to Production → emergency-rollback  |
| Get help                | #dev-ops Slack channel                               |

### Key Takeaways

✅ **PRs are automatically tested** - Fix failures before merge  
✅ **Staging deploys automatically** - Test there before production  
✅ **Production requires approval** - Deliberate and safe  
✅ **Rollbacks are automatic** - Safety net for failures  
✅ **Everything is tracked** - Audit trail for all changes

### Next Steps

1. **Read this document thoroughly**
2. **Try a test PR** to see CI in action
3. **Test on staging** to understand the flow
4. **Ask questions** in #dev-ops channel
5. **Bookmark this doc** for reference

---

**Questions or Feedback?**  
Contact the DevOps team in #dev-ops or email devops@company.com

**Document Changelog:**

- 2025-01-XX: Initial version
- Future updates tracked in git history
