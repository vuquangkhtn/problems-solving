# Deployment Guide

## GitHub Pages Setup

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. **Enable GitHub Pages** in your repository settings:

   - Go to `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`
   - Save the settings

2. **Repository Permissions**:
   - Ensure the repository has `Actions` enabled
   - The workflow has the necessary permissions (already configured)

### Automatic Deployment

The site will automatically deploy when:
- You push to the `main` branch
- You manually trigger the workflow from the Actions tab

### Deployment Process

1. **Build Phase**:
   - Installs Node.js and npm dependencies
   - Runs `npm run docs:build` to generate static files
   - Uploads the built site as an artifact

2. **Deploy Phase**:
   - Downloads the artifact
   - Deploys to GitHub Pages
   - Site becomes available at: `https://vuquangkhtn.github.io/problems-solving/`

### Manual Deployment

To deploy manually:

```bash
# Using Yarn (recommended for local development)
yarn docs:build
yarn docs:preview

# Using npm (used in GitHub Actions)
npm run docs:build
npm run docs:preview
```

### Troubleshooting

**Common Issues:**

1. **404 Errors**: Ensure the `base` URL in `.vitepress/config.js` matches your repository name
2. **Build Failures**: Check the Actions tab for detailed error logs
3. **Dead Link Errors**: VitePress may fail on broken internal links - use `ignoreDeadLinks: true` in config
4. **Assets Not Loading**: Verify all links use relative paths or the correct base URL
5. **Yarn Workspace Issues**: Use npm in GitHub Actions for public repositories

**Checking Deployment Status:**

1. Go to the `Actions` tab in your repository
2. Look for the "Deploy VitePress site to Pages" workflow
3. Click on the latest run to see detailed logs

### Local Development

```bash
# Using Yarn (recommended)
yarn docs:dev
yarn docs:build
yarn docs:preview

# Using npm
npm run docs:dev
npm run docs:build
npm run docs:preview
```

### Configuration Files

- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`.vitepress/config.js`** - VitePress configuration
- **`.nojekyll`** - Prevents Jekyll processing
- **`package.json`** - Contains deployment scripts

---

_Once deployed, your knowledge base will be publicly accessible and perfect for sharing with potential employers or including in your portfolio!_