// src/app/api/swagger/route.js

import swaggerSpec from '@/swagger/swagger-doc';

/**
 * @swagger
 * /api/swagger:
 *   get:
 *     summary: คืนค่า Swagger Spec JSON สำหรับแสดงผลใน Swagger UI
 *     description: ใช้สำหรับให้ Swagger UI ดึงโครงสร้างของ API ทั้งหมดจาก JSON
 *     responses:
 *       200:
 *         description: ส่ง Swagger Spec JSON สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
    return Response.json(swaggerSpec);
}