// src/app/api/auth/logout/route.js

import { cookies } from 'next/headers';

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: ออกจากระบบ (Logout)
 *     responses:
 *       200:
 *         description: Logout สำเร็จ และลบ session cookie
 *       500:
 *         description: Logout ล้มเหลว
 */
export async function POST() {
    try {
        // ลบ cookie โดยกำหนด path ให้ชัดเจน
        cookies().delete('session_uid', { path: '/' });

        return Response.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('❌ Logout error:', error);
        return new Response(JSON.stringify({ message: 'Logout failed' }), { status: 500 });
    }
}