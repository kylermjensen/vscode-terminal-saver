# Publishing to VS Code Marketplace

Complete guide to publishing Terminal Transcript Saver to the VS Code Marketplace.

## Prerequisites

- Microsoft account (personal or work)
- Extension packaged and tested locally
- Repository on GitHub with proper documentation

## Step 1: Create Publisher Account

### 1.1 Sign up for Azure DevOps

1. Go to https://dev.azure.com
2. Sign in with your Microsoft account
3. If you don't have an organization, create one:
   - Click "New organization"
   - Name it (e.g., `kylermjensen-extensions`)
   - Choose a region (United States)

### 1.2 Create Personal Access Token (PAT)

1. In Azure DevOps, click your profile icon (top right)
2. Select "Personal access tokens"
3. Click "+ New Token"
4. Configure:
   - **Name:** `vscode-marketplace-publisher`
   - **Organization:** Select your organization
   - **Expiration:** Custom (1 year recommended)
   - **Scopes:** Click "Show all scopes" → Check **Marketplace > Manage**
5. Click "Create"
6. **IMPORTANT:** Copy the token immediately - you won't see it again!
7. Save it securely (password manager)

### 1.3 Create VS Code Publisher

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with the same Microsoft account
3. Click "Create publisher"
4. Fill in:
   - **Publisher ID:** `kylermjensen` (lowercase, no spaces - this is permanent!)
   - **Display Name:** `Kyle Jensen`
   - **Email:** Your email
   - **Description:** "VS Code extensions by Kyle Jensen"
5. Click "Create"

**Note:** Publisher ID must match the `publisher` field in your `package.json`.

## Step 2: Prepare Extension for Publishing

### 2.1 Update package.json

Verify these fields are correct:

```json
{
  "publisher": "kylermjensen",
  "repository": {
    "type": "git",
    "url": "https://github.com/kylermjensen/vscode-terminal-saver"
  },
  "bugs": {
    "url": "https://github.com/kylermjensen/vscode-terminal-saver/issues"
  },
  "homepage": "https://github.com/kylermjensen/vscode-terminal-saver#readme"
}
```

### 2.2 Add Extension Icon (Optional but Recommended)

1. Create 128x128 PNG icon
2. Save as `icon.png` in repo root
3. Add to package.json:
   ```json
   "icon": "icon.png"
   ```

### 2.3 Verify .vscodeignore

Ensure unnecessary files are excluded (already done):
```
transcript-*.txt
*.vsix
spec-vscode.md
verify-*.sh
```

## Step 3: Publish Extension

### 3.1 Login to Marketplace

```bash
npx @vscode/vsce login kylermjensen
```

When prompted, enter the Personal Access Token you created.

### 3.2 Publish

```bash
# Publish version 1.0.0
npx @vscode/vsce publish
```

This will:
1. Package the extension
2. Upload to Marketplace
3. Extension will be available within ~5 minutes

### 3.3 Verify Publication

1. Go to https://marketplace.visualstudio.com/items?itemName=kylermjensen.terminal-transcript-saver
2. Check that:
   - Extension appears correctly
   - README renders properly
   - Install button works

## Step 4: Update README Badges

Once published, update README.md with real marketplace badge:

```markdown
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/kylermjensen.terminal-transcript-saver.svg)](https://marketplace.visualstudio.com/items?itemName=kylermjensen.terminal-transcript-saver)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/kylermjensen.terminal-transcript-saver.svg)](https://marketplace.visualstudio.com/items?itemName=kylermjensen.terminal-transcript-saver)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/kylermjensen.terminal-transcript-saver.svg)](https://marketplace.visualstudio.com/items?itemName=kylermjensen.terminal-transcript-saver)
```

## Publishing Updates

### Version Bump and Publish

For patch updates (1.0.0 → 1.0.1):
```bash
npx @vscode/vsce publish patch
```

For minor updates (1.0.0 → 1.1.0):
```bash
npx @vscode/vsce publish minor
```

For major updates (1.0.0 → 2.0.0):
```bash
npx @vscode/vsce publish major
```

Or specify version manually:
```bash
npx @vscode/vsce publish 1.0.1
```

### Update CHANGELOG.md

Before each release, update `CHANGELOG.md`:

```markdown
## [1.0.1] - 2025-12-18

### Fixed
- Improved clipboard error handling on Linux
- Updated documentation for Windows users

### Changed
- Better platform detection logic
```

## Troubleshooting

### "Publisher not found" Error

**Problem:** `vsce` can't find your publisher ID.

**Solution:**
1. Verify publisher ID at https://marketplace.visualstudio.com/manage
2. Ensure `package.json` has exact matching `publisher` field
3. Login again: `npx @vscode/vsce login kylermjensen`

### "Invalid Token" Error

**Problem:** Personal Access Token expired or invalid.

**Solution:**
1. Create new PAT in Azure DevOps
2. Ensure scope includes **Marketplace > Manage**
3. Login with new token

### Package Size Too Large

**Problem:** `.vsix` file exceeds size limit.

**Solution:**
1. Check `.vscodeignore` excludes unnecessary files
2. Remove `node_modules` and large dependencies
3. Use `npx @vscode/vsce ls` to see included files

## Best Practices

1. **Test locally first:** Always install and test `.vsix` before publishing
2. **Semantic versioning:** Follow semver (major.minor.patch)
3. **Changelog:** Update `CHANGELOG.md` for every release
4. **CI/CD:** Consider GitHub Actions for automated publishing
5. **Monitor stats:** Check download counts and ratings regularly

## Security Notes

- **Never commit PAT to git**
- Store PAT in password manager
- Set PAT expiration (renew yearly)
- Use separate PATs for different projects if publishing multiple extensions

## Useful Links

- **Azure DevOps:** https://dev.azure.com
- **Marketplace Management:** https://marketplace.visualstudio.com/manage
- **vsce Documentation:** https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Extension Guidelines:** https://code.visualstudio.com/api/references/extension-guidelines
