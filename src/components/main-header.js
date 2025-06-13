// src/components/main-header.js

'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/session')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.user?.uid) setIsLoggedIn(true);
            });
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault(); // ดักไม่ให้ลิงก์ทำงาน
        const res = await fetch('/api/auth/logout', { method: 'POST' });
        if (res.ok) {
            setIsLoggedIn(false);
            router.push('/auth');
        }
    };

    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">Thunderbolts*</Link>
            </div>
            <nav className="main-nav">
                <ul>
                    <li><NavLink href="/">Home</NavLink></li>
                    <li><NavLink href="/users">Users</NavLink></li>
                    {isLoggedIn ? (
                        <>
                            <li><NavLink href="/ciud">CIUD</NavLink></li>
                            <li>
                                <a href="/auth" onClick={handleLogout} role="button" className="nav-link">
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <li><NavLink href="/auth">Login</NavLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}