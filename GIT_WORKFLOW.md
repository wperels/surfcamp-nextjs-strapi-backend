# Strapi Git Workflow Guide

This document describes the recommended git workflow for managing schema and content changes in your Strapi project.

## Overview

This git setup includes:
- ✅ Automatic database backups before each commit
- ✅ Schema validation
- ✅ Secure handling of environment variables
- ✅ Content tracking best practices
- ✅ Easy content recovery

## Setup

The git workflow has been initialized. Here's what was configured:

### 1. **Backup System**
- **Location**: `.tmp/backups/`
- **Frequency**: Before each commit (via pre-commit hook)
- **Retention**: Keeps 10 most recent backups
- **Usage**: `npm run db:backup`

### 2. **Pre-commit Hooks**
Automatically runs before each commit:
- Creates database backup
- Validates schema JSON files
- Warns about sensitive files

### 3. **Tracked Files**
✅ Tracked in git:
- `src/api/*/content-types/*/schema.json` - Content type schemas
- `src/components/**/*.json` - Component definitions
- `config/` - Configuration files (except .env)
- `src/` - Source code
- `package.json` - Dependencies

❌ Ignored (not tracked):
- `.env` - Environment variables
- `.tmp/data.db` - Active database file
- `node_modules/` - Dependencies
- `dist/` - Build output

✅ Backups (tracked but separate):
- `.tmp/backups/*.db.backup-*.db` - Database backups

## Common Workflows

### 1. **Making Schema Changes**

```bash
# 1. Make your schema changes in Strapi admin
# 2. Stage schema files
git add src/api/*/content-types/*/schema.json

# 3. Commit (pre-commit hook will backup database)
git commit -m "feat: add field to info-block schema"

# 4. Push to remote
git push origin main
```

### 2. **Creating New Content Types**

```bash
# 1. Create content type in Strapi admin
# 2. Stage the new schema
git add src/api/my-new-type/

# 3. Commit
git commit -m "feat: create new content type 'my-new-type'"

# 4. Push
git push origin main
```

### 3. **Recovering from Database Issues**

If your database is corrupted, recover from a backup:

```bash
# 1. List available backups
ls -la .tmp/backups/

# 2. Restore a specific backup
cp .tmp/backups/data.db.backup-2025-11-15T07-13-45.db .tmp/data.db

# 3. Restart Strapi
npm run develop
```

### 4. **Reverting Schema Changes**

```bash
# View commit history
git log --oneline

# Revert to a previous commit
git revert <commit-hash>
# or
git checkout <commit-hash> -- src/api/*/content-types/*/schema.json

# Restore the corresponding database backup
cp .tmp/backups/data.db.backup-*.db .tmp/data.db
```

### 5. **Syncing with Team Members**

```bash
# Pull latest schema changes
git pull origin main

# The database won't be synced, but you can:
# 1. Ask team member for their latest backup
# 2. Use it to restore local state
cp ~/Downloads/their-backup.db .tmp/data.db
npm run develop
```

## Useful Commands

### View schema changes
```bash
git diff src/api/*/content-types/*/schema.json
```

### See what changed in a commit
```bash
git show <commit-hash>
```

### See full history of schema changes
```bash
git log --follow src/api/*/content-types/*/schema.json
```

### Create a backup manually
```bash
npm run db:backup
```

### Clean old backups (keep last 5)
```bash
ls -t .tmp/backups/data.db.backup-*.db | tail -n +6 | xargs rm
```

## Best Practices

1. **Commit often**: Make commits for each significant schema change
2. **Write clear messages**: Use conventional commits (feat:, fix:, refactor:)
3. **Backup before major changes**: Run `npm run db:backup` before risky operations
4. **Never commit .env**: Always keep environment variables in .gitignore
5. **Document schema changes**: Use commit messages to explain why changes were made
6. **Team coordination**: Tell team members when you make schema changes that affect them

## Recovery Scenarios

### Scenario 1: Accidentally deleted a field
```bash
# View what was in the field
git show HEAD:src/api/info-block/content-types/info-block/schema.json

# Restore the schema from git
git checkout HEAD -- src/api/info-block/content-types/info-block/schema.json

# Restore database to match
cp .tmp/backups/data.db.backup-LATEST.db .tmp/data.db
```

### Scenario 2: Schema corruption
```bash
# Reset to last known good state
git reset --hard <last-known-good-commit>

# Restore matching database
cp .tmp/backups/data.db.backup-<matching-backup>.db .tmp/data.db

# Restart Strapi
npm run develop
```

### Scenario 3: Need to see what changed between two dates
```bash
git log --after="2025-11-01" --before="2025-11-15" --oneline
git diff <old-commit> <new-commit> src/api/
```

## Troubleshooting

### Pre-commit hook not running
Make the hook executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Can't find a backup
```bash
# List all backups with dates
ls -la .tmp/backups/
```

### Database corrupted and no backups
This is why regular commits are important! Always maintain a git history.

## Next Steps

1. Create your first commit:
   ```bash
   git add .
   git commit -m "initial: set up Strapi project with git workflow"
   ```

2. Create a remote repository (GitHub, GitLab, etc.)

3. Push your code:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

4. Share with team members and follow the workflow above
