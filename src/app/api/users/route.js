// src/app/api/users/route.js

import { getAllUsers, addUser } from '@/db/users';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ดึงผู้ใช้ทั้งหมด หรือกรองตาม status, gender, role
 *     description: ส่ง query string เพื่อกรองผู้ใช้ เช่น `status=active&gender=female`
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, pending, banned, deleted]
 *         description: สถานะผู้ใช้
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female]
 *         description: เพศของผู้ใช้
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [member, admin]
 *         description: บทบาทของผู้ใช้
 *     responses:
 *       200:
 *         description: รายการผู้ใช้ทั้งหมดที่ตรงเงื่อนไข
 *       500:
 *         description: โหลดข้อมูลล้มเหลว
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const gender = searchParams.get('gender');
    const role = searchParams.get('role');

    const allUsers = await getAllUsers();

    const filtered = allUsers.filter((user) => {
      return (!status || user.status === status) &&
        (!gender || user.gender === gender) &&
        (!role || user.role === role);
    });

    return Response.json(filtered);
  } catch (error) {
    console.error('❌ Error loading users:', error);
    return new Response(JSON.stringify({ message: 'Failed to load users' }), { status: 500 });
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: เพิ่มผู้ใช้ใหม่
 *     description: เพิ่มผู้ใช้ใหม่พร้อมเข้ารหัสรหัสผ่าน ตรวจสอบ username และ email ซ้ำ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               avatar:
 *                 type: string
 *               fullname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending, banned, deleted]
 *               role:
 *                 type: string
 *                 enum: [member, admin]
 *     responses:
 *       201:
 *         description: เพิ่มผู้ใช้สำเร็จ
 *       400:
 *         description: ข้อมูลไม่ครบ
 *       409:
 *         description: username หรือ email ซ้ำ
 *       500:
 *         description: เพิ่มผู้ใช้ล้มเหลว
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const { username, password, email } = body;

    if (!username || !password || !email) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const existingUsers = await getAllUsers();
    const isUsernameTaken = existingUsers.some(u => u.username === username);
    const isEmailTaken = existingUsers.some(u => u.email === email);

    if (isUsernameTaken) {
      return new Response(JSON.stringify({ message: 'Username already taken' }), { status: 409 });
    }

    if (isEmailTaken) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await addUser({
      ...body,
      password: hashedPassword
    });

    return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Failed to create user' }), { status: 500 });
  }
}