// src/db/users.js

import path from 'path';
import { fileURLToPath } from 'url';
import sql from 'better-sqlite3';
import bcrypt from 'bcryptjs';

// สร้าง path ไปยัง src/db/data.db (ใช้ __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, './data.db'); // ✅ เปลี่ยน path มาที่ src/db/
const db = sql(dbPath);

// ENUM สำหรับ validation
export const Gender = ['male', 'female'];
export const UserStatus = ['active', 'inactive', 'pending', 'banned', 'deleted'];
export const UserRole = ['member', 'admin'];

// ฟังก์ชัน delay จำลอง network/database latency
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ดึงผู้ใช้ทั้งหมด (ไม่รวม password)
export async function getAllUsers() {
  await delay(1000);
  const rows = db.prepare('SELECT * FROM users ORDER BY uid').all();
  return rows.map(({ password, ...user }) => user);
}

// ดึงผู้ใช้ที่ status = 'active'
export async function getActiveUsers() {
  await delay(500);
  const rows = db.prepare("SELECT * FROM users WHERE status = 'active' ORDER BY uid").all();
  return rows.map(({ password, ...user }) => user);
}

// ดึงผู้ใช้ตาม uid
export async function getUserById(uid) {
  await delay(300);
  const row = db.prepare("SELECT * FROM users WHERE uid = ?").get(uid);
  if (!row) return null;
  const { password, ...user } = row;
  return user;
}

// เพิ่มผู้ใช้ใหม่
export async function addUser(user) {
  if (!Gender.includes(user.gender)) throw new Error('Invalid gender');
  if (!UserStatus.includes(user.status ?? 'active')) throw new Error('Invalid status');
  if (!UserRole.includes(user.role ?? 'member')) throw new Error('Invalid role');

  const count = db.prepare("SELECT COUNT(*) AS total FROM users").get().total;
  const nextUid = `U${String(count + 1).padStart(3, '0')}`; // 🔁 ป้องกัน frontend สร้าง uid เอง

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (
      uid, username, password, email, mobile, avatar,
      fullname, birthday, gender, status, role,
      created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
  `);

  stmt.run(
    nextUid,
    user.username,
    hashedPassword,
    user.email,
    user.mobile,
    user.avatar,
    user.fullname,
    user.birthday,
    user.gender,
    user.status ?? 'active',
    user.role ?? 'member'
  );
}

// อัปเดตข้อมูลผู้ใช้ตาม uid
export async function updateUser(uid, updates) {
  if (!uid) return;

  const disallowed = ['uid', 'created_at', 'updated_at']; // ❌ ไม่ให้แก้ไข
  const fields = [];
  const values = [];

  if (updates.gender && !Gender.includes(updates.gender)) {
    throw new Error('Invalid gender');
  }
  if (updates.status && !UserStatus.includes(updates.status)) {
    throw new Error('Invalid status');
  }
  if (updates.role && !UserRole.includes(updates.role)) {
    throw new Error('Invalid role');
  }

  for (const [key, value] of Object.entries(updates)) {
    if (!disallowed.includes(key)) {
      if (key === 'password') {
        fields.push(`${key} = ?`);
        values.push(bcrypt.hashSync(value, 10));
      } else {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
  }

  if (fields.length === 0) return;

  const stmt = db.prepare(`
    UPDATE users
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE uid = ?
  `);

  stmt.run(...values, uid);
}

// ลบผู้ใช้ตาม uid
export async function deleteUser(uid) {
  const stmt = db.prepare("DELETE FROM users WHERE uid = ?");
  stmt.run(uid);
}

export function isUsernameTaken(username, excludeUid = null) {
  const stmt = excludeUid
    ? db.prepare("SELECT uid FROM users WHERE username = ? AND uid != ?")
    : db.prepare("SELECT uid FROM users WHERE username = ?");
  const row = excludeUid ? stmt.get(username, excludeUid) : stmt.get(username);
  return !!row;
}

export function isEmailTaken(email, excludeUid = null) {
  const stmt = excludeUid
    ? db.prepare("SELECT uid FROM users WHERE email = ? AND uid != ?")
    : db.prepare("SELECT uid FROM users WHERE email = ?");
  const row = excludeUid ? stmt.get(email, excludeUid) : stmt.get(email);
  return !!row;
}

export async function getUserWithPassword(username) {
  const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  return row || null; // ไม่ลบ password ทิ้ง
}