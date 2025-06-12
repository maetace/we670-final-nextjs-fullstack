// src/app/api/swagger/route.js

import swaggerSpec from '@/swagger/swagger-doc';

export async function GET() {
    return Response.json(swaggerSpec);
}