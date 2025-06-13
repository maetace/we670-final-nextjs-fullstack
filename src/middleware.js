// src/middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // ✅ แปลง cookie string → object
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => c.trim().split('='))
    );

    const session = cookies['session_uid'];

    const isAuthPage = pathname === '/auth';
    const isProtectedPage = pathname.startsWith('/ciud');

    // ⛔ หากยังไม่มี session → ไม่ให้เข้า /ciud
    if (!session && isProtectedPage) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // 🔁 หาก login แล้ว → ไม่ให้เข้า /auth ซ้ำ
    if (session && isAuthPage) {
        return NextResponse.redirect(new URL('/ciud', request.url));
    }

    // ✅ อนุญาตให้เข้าถูกต้อง
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth', '/ciud'],
};