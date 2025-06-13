// src/app/(admin)/auth/page.js

'use client';

import styles from '@/styles/auth.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ✅ ตรวจสอบ session ก่อนแสดงหน้า login
    useEffect(() => {
        fetch('/api/session')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.user?.uid) {
                    router.replace('/ciud'); // มี session → ไปหน้า admin
                }
            });
    }, [router]);

    // ✅ ฟังก์ชันเข้าสู่ระบบ
    async function handleLogin(e) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (!res.ok) {
                setError(result.message || 'Login failed');
            } else {
                router.push('/ciud');
            }
        } catch (err) {
            console.error('❌ Fetch error:', err);
            setError('Could not connect to server');
        }
    }

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1 className={styles.title}>Login</h1>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />

                <div style={{ position: 'relative' }}>
                    <input
                        className={styles.input}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ccc',
                            padding: 0
                        }}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button className={styles.button} type="submit">Sign in</button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}