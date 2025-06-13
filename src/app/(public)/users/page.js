// src/app/(public)/users/page.js

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UsersFilter from "@/components/users-filter";
import UsersList from '@/components/users-list';

export default function UsersPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // 🧠 ค่าที่ filter จาก URL
    const gender = searchParams.get('gender') || '';
    const status = searchParams.get('status') || '';
    const role = searchParams.get('role') || '';

    // 📦 โหลดข้อมูล users ตาม filter
    useEffect(() => {
        const query = new URLSearchParams();
        if (gender) query.set('gender', gender);
        if (status) query.set('status', status);
        if (role) query.set('role', role);

        fetch(`/api/users?${query.toString()}`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => {
                console.error('❌ Failed to fetch:', err);
                setError('Failed to load users');
            });
    }, [gender, status, role]);

    // 🧭 เปลี่ยน filter → update URL
    const handleFilterChange = (e) => {
        const params = new URLSearchParams(searchParams.toString());
        const { name, value } = e.target;

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        router.replace(`/users?${params.toString()}`);
    };

    return (
        <section>
            <h1>Thunderbolts* Directory</h1>
            <UsersFilter />
            {error ? <p style={{ color: 'red' }}>{error}</p> : <UsersList users={users} />}
        </section>
    );
}