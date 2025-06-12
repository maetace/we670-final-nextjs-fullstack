// src/components/nav-link.js

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavLink เป็น component ที่ใช้แทน <Link>
 * โดยจะเพิ่ม class 'active' หาก path ปัจจุบันตรงกับ href ที่ส่งมา
 */
export default function NavLink({ href, children }) {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={isActive ? 'active' : ''}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
}