// seed/create-db.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../src/db/data.db'); // จุดเชื่อมไปยัง SQLite DB

const db = new Database(dbPath);

// ลบตารางเก่าทิ้งก่อนสร้างใหม่ (เพื่อให้ seed ซ้ำได้ใน dev)
db.exec(`
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    uid TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mobile TEXT,
    avatar TEXT,
    fullname TEXT,
    birthday TEXT,
    gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive', 'pending', 'banned', 'deleted')) NOT NULL DEFAULT 'active',
    role TEXT CHECK (role IN ('member', 'admin')) NOT NULL DEFAULT 'member',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_login TEXT
  );
`);

console.log('✅ Database and table "users" created successfully.');