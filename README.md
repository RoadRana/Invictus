# Invictus UMVS

> Modern web platform for the main business website of Invictus

[![CI/CD](https://img.shields.io/github/actions/workflow/status/your-org/invictus-frontend/pr-ci.yml?branch=develop&label=CI%2FCD)](https://github.com/your-org/invictus-frontend/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**🌐 Environments:**
- **Production**: [invictusumvs.net](https://invictusumvs.net)
- **Staging**: [staging.invictusumvs.net](https://staging.invictusumvs.net)

---

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/your-org/invictus-frontend.git
cd invictus-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Visit http://localhost:5173 to see the app.

---

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Local setup, Git workflow, coding standards
- [CI/CD Pipeline](docs/CI_CD.md) - Automated testing and deployment
- [Deployment Guide](docs/DEPLOYMENT.md) - Staging and production deployment
- [Architecture Overview](docs/ARCHITECTURE.md) - Technical architecture and AWS infrastructure

## 🛠️ Tech Stack
### Frontend

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: **TBD**
- **Icons**: Font Awesome, React Icons

### Infrastructure

- **Hosting**: AWS S3 + CloudFront
- **DNS**: OpenSRS
- **SSL/TLS**: AWS Certificate Manager
- **CI/CD**: GitHub Actions

### Development Tools

- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Security**: npm audit, Trivy

## 🔄 Git Workflow
We follow Git Flow with the following branches:
```
main (production)
  ↑
develop (staging)
  ↑
feature/* (your work here)
```

### Creating a Feature
```bash
# Always branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# Work on your feature
git add .
git commit -m "Add my new feature"
git push origin feature/my-new-feature

# Open PR: feature/my-new-feature → develop
```
📖 See [Development Guide](docs/DEVELOPMENT.md) for detailed workflow.

## ✅ Quality Standards
All pull requests must pass:

- ✅ Linting - ESLint code quality checks
- ✅ Formatting - Prettier code formatting
- ✅ Unit Tests - Vitest test suite
- ✅ Integration Tests - Component integration tests
- ✅ Security Scan - Vulnerability detection (npm audit, Trivy)
- ✅ Build - Production build succeeds

**Currently in onboarding mode - these checks are informational while the team ramps up.**

## 🚢 Deployment
### Automatic Deployments

- **Staging**: Auto-deploys on merge to develop branch
- **Production**: Manual approval required for main branch

### Deployment Pipeline
```
Feature Branch → PR → CI Checks → Merge to develop → Auto-deploy to staging
                                                    ↓
                                              QA Approval
                                                    ↓
                                           Merge to main → Manual deploy to production
```

### Environments

| Environment | URL                          | Branch   | Auto-Deploy | Backups                  |
|-------------|-------------------------------|----------|-------------|--------------------------|
| Production  | [invictusumvs.net](https://invictusumvs.net) | `main`   | No (manual) | 30-day S3 versioning    |
| Staging     | [staging.invictusumvs.net](https://staging.invictusumvs.net) | `develop` | Yes         | 7-day backup bucket      |

📖 See [Deployment Guide](docs/DEPLOYMENT.md) for detailed process.

## 🏗️ Infrastructure
### AWS Services

- **S3**: Static website hosting (private buckets)
- **CloudFront**: Global CDN with HTTPS
- **Certificate Manager**: SSL/TLS certificates (auto-renewal)
- **Route 53 (OPTIONAL & NOT USED FOR NOW)**: DNS management

### Disaster Recovery

**Rollback Strategy**: Multi-tier rollback system

- S3 backup buckets (fastest - 1-2 minutes)
- GitHub Actions artifacts (30-day retention)
- Git tags (permanent history)

📖 See [Architecture Overview](docs/ARCHITECTURE.md) for details.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team
*to be populated by team*
