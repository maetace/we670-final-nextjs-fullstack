// src/app/api/auth/session/route.js

import { headers } from 'next/headers';
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
        // ✅ อ่าน cookie จาก headers แทน cookies().get() เพื่อหลีกเลี่ยง runtime error
        const cookieHeader = headers().get('cookie') || '';

        // ✅ แปลง cookie string → เป็น object key-value
        const cookies = Object.fromEntries(
            cookieHeader.split(';').map(c => c.trim().split('='))
        );

        const uid = cookies['session_uid'];

        if (!uid) {
            return new Response(JSON.stringify({ message: 'No session found' }), { status: 401 });
        }

        const user = await getUserById(uid);

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // ✅ ไม่คืน password กลับไป
        const { password: _, ...safeUser } = user;

        return Response.json({ message: 'Session active', user: safeUser });
    } catch (error) {
        console.error('❌ Session error:', error);
        return new Response(JSON.stringify({ message: 'Failed to retrieve session' }), { status: 500 });
    }
}