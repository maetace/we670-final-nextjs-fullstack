// src/components/main-header.js

import Link from 'next/link';
import NavLink from './nav-link';

/**
 * MainHeader เป็น header หลักของแอป
 * ประกอบด้วยโลโก้ และเมนูนำทาง (Navigation Links)
 */
export default function MainHeader() {
    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">Thunderbolts*</Link>
            </div>
            <nav className="main-nav">
                <ul>
                    <li><NavLink href="/">Home</NavLink></li>
                    <li><NavLink href="/users">Users</NavLink></li>
                    <li><NavLink href="/users/active">Active Users</NavLink></li>
                    <li><NavLink href="/auth">Login</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}