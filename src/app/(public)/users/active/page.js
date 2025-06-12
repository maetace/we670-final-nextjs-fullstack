// src/app/(content)/users/page.js

'use client';

import { useEffect, useState } from "react";
import UsersList from "@/components/users-list";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            try {
                const res = await fetch("/api/users?status=active");

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("❌ Failed to fetch users:", err);
                setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, []);

    if (isLoading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!users || users.length === 0) return <p>ไม่พบผู้ใช้ที่เปิดใช้งาน</p>;

    return (
        <section>
            <h1>Active Users Only</h1>
            <UsersList users={users} />
        </section>
    );
}