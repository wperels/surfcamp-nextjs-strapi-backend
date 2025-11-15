#!/usr/bin/env node

/**
 * Database Backup Script
 * Creates timestamped backups of the SQLite database
 * 
 * Usage: node scripts/backup-db.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DB_SOURCE = path.join(__dirname, '..', '.tmp', 'data.db');
const BACKUP_DIR = path.join(__dirname, '..', '.tmp', 'backups');
const MAX_BACKUPS = 10;

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`✓ Created backup directory: ${BACKUP_DIR}`);
}

// Check if database exists
if (!fs.existsSync(DB_SOURCE)) {
  console.log('ℹ No database found. Skipping backup.');
  process.exit(0);
}

// Create timestamped backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupFile = path.join(BACKUP_DIR, `data.db.backup-${timestamp}.db`);

try {
  fs.copyFileSync(DB_SOURCE, backupFile);
  console.log(`✓ Database backed up to: ${backupFile}`);
  
  // Clean up old backups (keep only MAX_BACKUPS most recent)
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('data.db.backup-'))
    .sort()
    .reverse();
  
  if (backups.length > MAX_BACKUPS) {
    const toDelete = backups.slice(MAX_BACKUPS);
    toDelete.forEach(backup => {
      const filePath = path.join(BACKUP_DIR, backup);
      fs.unlinkSync(filePath);
      console.log(`✓ Cleaned up old backup: ${backup}`);
    });
  }
  
  console.log(`✓ Backup complete. Keeping ${Math.min(backups.length + 1, MAX_BACKUPS)} recent backups.`);
} catch (error) {
  console.error('✗ Backup failed:', error.message);
  process.exit(1);
}
