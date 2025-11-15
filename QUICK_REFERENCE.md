# Quick Git Workflow Reference

## Your Git Setup is Ready! 🎉

### What's Been Set Up

✅ **Git Repository** - Initialized with your Strapi project  
✅ **Backup System** - Automatic backups before each commit  
✅ **Pre-commit Hooks** - Validates schemas and runs backups  
✅ **NPM Scripts** - Easy commands for common tasks  

---

## Quick Start Commands

### 1. Make Changes in Strapi Admin
Make changes to your content types, components, etc. in the Strapi admin panel.

### 2. Stage Your Changes
```bash
# Stage all schema changes
git add src/api/*/content-types/*/schema.json src/components/

# Or stage everything
git add .
```

### 3. Commit Your Changes
```bash
git commit -m "feat: update info-block schema"
```

**What happens automatically:**
- Database is backed up to `.tmp/backups/`
- Schema files are validated
- Your changes are tracked in git

### 4. View Your History
```bash
# See recent commits
git log --oneline

# See what changed
git show HEAD

# See changes to schemas only
git diff HEAD~1 src/api/*/content-types/*/schema.json
```

---

## Most Important Commands

### Backup the database manually
```bash
npm run db:backup
```

### List all backups
```bash
npm run db:list-backups
```

### See commit history
```bash
npm run git:log
```

### See what changed
```bash
npm run git:diff
```

---

## Disaster Recovery

### "My database got corrupted"
```bash
# 1. Find the backup you want
npm run db:list-backups

# 2. Restore it
cp .tmp/backups/data.db.backup-2025-11-15T*.db .tmp/data.db

# 3. Restart Strapi
npm run develop
```

### "I want to undo my schema changes"
```bash
# See what commit had your changes
git log --oneline

# Restore schema from that commit
git checkout <commit-hash> -- src/api/info-block/content-types/info-block/schema.json

# And restore the matching database backup
```

### "I want to see what I changed"
```bash
# See current changes
git diff

# See changes in a specific file
git diff src/api/info-block/content-types/info-block/schema.json

# See changes from previous commit
git show HEAD:src/api/info-block/content-types/info-block/schema.json
```

---

## File Structure

```
surfcamp-nextjs-strapi-backend/
├── .git/                           # Git repository (created)
│   └── hooks/
│       └── pre-commit              # Auto runs before commits
├── .tmp/
│   ├── data.db                     # Active database (not tracked)
│   └── backups/                    # Database backups (tracked)
│       ├── .gitkeep
│       ├── data.db.backup-*.db    # Timestamped backups
├── src/api/*/content-types/*/     # Your schemas (tracked)
├── scripts/
│   └── backup-db.js               # Backup script
├── GIT_WORKFLOW.md                # Full documentation
├── .gitignore                     # What git ignores
└── package.json                   # NPM scripts
```

---

## Committing Best Practices

### ✅ Good commit messages
```bash
git commit -m "feat: add image field to info-block"
git commit -m "fix: correct oneToMany relation in info-blocks-landing"
git commit -m "refactor: reorganize schema files"
```

### ❌ Bad commit messages
```bash
git commit -m "update"
git commit -m "changes"
git commit -m "fixed stuff"
```

### Commit Format
```
<type>: <short description>

<optional longer explanation>
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code reorganization
- `docs` - Documentation
- `chore` - Maintenance

---

## Useful Links

📖 **Full Guide**: Read `GIT_WORKFLOW.md` for complete documentation  
📚 **Git Docs**: https://git-scm.com/doc  
🎯 **Conventional Commits**: https://www.conventionalcommits.org/

---

## Need Help?

1. **Can't remember a command?** → Check this file
2. **Want full details?** → Read `GIT_WORKFLOW.md`
3. **Something broke?** → See the "Disaster Recovery" section above

---

## Next Steps

1. **Make your first change** in Strapi Admin
2. **Stage and commit** it with git:
   ```bash
   git add src/
   git commit -m "feat: initial content types"
   ```
3. **Create a remote repository** (GitHub, GitLab, etc.)
4. **Push your code**:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

Good luck! 🚀
