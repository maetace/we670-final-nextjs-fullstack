// src/swagger/swagger-config.js

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Thunderbolts* Directory API',
        version: '1.0.0',
        // description: 'API สำหรับจัดการข้อมูลผู้ใช้ในระบบ Thunderbolts Directory',
    },
    servers: [
        {
            url: 'http://localhost:3000', // ปรับให้ตรงกับ production URL ถ้ามี
            description: 'Local Server',
        },
    ],
};