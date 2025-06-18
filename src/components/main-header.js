// src/components/main-header.js

'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import Image from "next/image";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainHeader() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/session')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.user?.uid) setUser(data.user);
            });
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/logout', { method: 'POST' });
        if (res.ok) {
            setUser(null);
            router.push('/auth');
            router.refresh();
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
                    <li><NavLink href="/dashboard">Dashboard</NavLink></li>
                    {user ? (
                        <>
                            <li><NavLink href="/ciud">CIUD</NavLink></li>
                            <li>
                                <a href="/auth" onClick={handleLogout} role="button" className="nav-link">
                                    Logout
                                </a>
                            </li>
                            <li>
                                <Link href={`/users/${user.uid}`}>
                                    <Image
                                        src={user.avatar}
                                        alt={user.fullname}
                                        width={32}
                                        height={32}
                                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                                    />
                                </Link>
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