// src/app/(public)/users/stats/route.js

import { getAllUsers } from '@/db/users';

/**
 * @swagger
 * /api/users/stats:
 *   get:
 *     summary: ดึงสถิติผู้ใช้งานตามสถานะ บทบาท เพศ และช่วงอายุ
 *     description: ส่งจำนวนผู้ใช้ในแต่ละประเภท เช่น status, role, gender และ age group
 *     responses:
 *       200:
 *         description: ส่งข้อมูลสถิติเชิงนับของผู้ใช้งานในระบบ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 24
 *                 byStatus:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 byRole:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 byGender:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 byAgeGroup:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 */
export async function GET() {
    try {
        const users = await getAllUsers();

        const byStatus = {};
        const byRole = {};
        const byGender = {};
        const byAgeGroup = {};
        let total = 0;

        const getAge = (birthday) => {
            const birth = new Date(birthday);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return isNaN(age) ? null : age;
        };

        for (const user of users) {
            total += 1;

            // status
            const status = user.status || 'unknown';
            byStatus[status] = (byStatus[status] || 0) + 1;

            // role
            const role = user.role || 'unknown';
            byRole[role] = (byRole[role] || 0) + 1;

            // gender
            const gender = user.gender || 'unknown';
            byGender[gender] = (byGender[gender] || 0) + 1;

            // age group
            const age = getAge(user.birthday);
            let group = 'unknown';
            if (age !== null) {
                if (age < 20) group = 'Under 20';
                else if (age < 30) group = '20s';
                else if (age < 40) group = '30s';
                else if (age < 50) group = '40s';
                else group = '50+';
            }
            byAgeGroup[group] = (byAgeGroup[group] || 0) + 1;
        }

        return Response.json({
            total,
            byStatus,
            byRole,
            byGender,
            byAgeGroup,
        });
    } catch (error) {
        console.error('❌ Error generating stats:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to generate stats' }),
            { status: 500 }
        );
    }
}