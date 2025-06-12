// src/app/api/auth/session/route.js

import { cookies } from 'next/headers';
import { getUserById } from '@/db/users';

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     summary: ตรวจสอบ session ปัจจุบัน และคืนค่าข้อมูลผู้ใช้
 *     responses:
 *       200:
 *         description: มี session อยู่ และคืนข้อมูลผู้ใช้
 *       401:
 *         description: ไม่พบ session
 *       404:
 *         description: ไม่พบผู้ใช้ในระบบ
 *       500:
 *         description: ดึงข้อมูล session ล้มเหลว
 */
export async function GET() {
    try {
        const uid = cookies().get('session_uid')?.value;

        if (!uid) {
            return new Response(JSON.stringify({ message: 'No session found' }), { status: 401 });
        }

        const user = await getUserById(uid);

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // ซ่อน password ด้วย destructuring
        const { password: _, ...safeUser } = user;

        return Response.json({ message: 'Session active', user: safeUser });
    } catch (error) {
        console.error('❌ Session error:', error);
        return new Response(JSON.stringify({ message: 'Failed to retrieve session' }), { status: 500 });
    }
}