// src/app/api/auth/login/route.js

import { getUserWithPassword } from '@/db/users';  // ✅ แทน getAllUsers
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: เข้าสู่ระบบด้วย username และ password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ พร้อมส่งข้อมูลผู้ใช้
 *       400:
 *         description: ข้อมูลไม่ครบ
 *       401:
 *         description: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
 *       403:
 *         description: บัญชีผู้ใช้ถูกระงับการใช้งาน
 *       500:
 *         description: เข้าสู่ระบบล้มเหลว
 */
export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return new Response(JSON.stringify({ message: 'Missing credentials' }), { status: 400 });
        }

        const user = await getUserWithPassword(username);  // ✅ ดึง user พร้อม password

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
        }

        if (user.status !== 'active') {
            return new Response(JSON.stringify({ message: 'Account is not active' }), { status: 403 });
        }

        cookies().set('session_uid', user.uid, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        const { password: _, ...safeUser } = user;

        return Response.json({ message: 'Login successful', user: safeUser });

    } catch (error) {
        console.error('❌ Login error:', error);
        return new Response(JSON.stringify({ message: 'Login failed' }), { status: 500 });
    }
}