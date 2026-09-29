const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'data.sqlite');
const db = new Database(dbPath);

// recommended pragmas
try { db.pragma('journal_mode = WAL'); } catch (e) { /* ignore */ }

// Initialize schema
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    password TEXT
  )
`).run();

// Leads table for provider integrations
db.prepare(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT,
    provider_lead_id TEXT,
    campaign TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    raw_payload TEXT,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
    valid INTEGER DEFAULT 1,
    validation_errors TEXT DEFAULT NULL,
    UNIQUE(provider, provider_lead_id)
  )
`).run();

// ensure 'role' column exists (default 'user')
const cols = db.prepare("PRAGMA table_info('users')").all();
if (!cols.find(c => c.name === 'role')) {
  try {
    db.prepare("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'").run();
  } catch (e) {
    // ignore if cannot alter (older sqlite?)
  }
}

module.exports = db;

// Create an initial admin user if environment variables are provided
try {
  const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const bcrypt = require('bcryptjs');
    const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(ADMIN_EMAIL);
    if (!exists) {
      const hashed = bcrypt.hashSync(ADMIN_PASSWORD, 10);
      db.prepare('INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)').run(ADMIN_EMAIL, 'Initial Admin', hashed, 'admin');
      console.log('Initial admin created:', ADMIN_EMAIL);
    }
  }
} catch (e) {
  // ignore errors during init
}
