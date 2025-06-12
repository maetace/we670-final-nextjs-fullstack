// src/app/(public)/users/page.js

import UsersList from "@/components/users-list";
import { notFound } from "next/navigation";

export default async function UsersPage() {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/api/users`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error("API Error:", res.statusText);
            notFound();
        }

        const users = await res.json();

        if (!users || users.length === 0) notFound();

        return (
            <section>
                <h1>Thunderbolts* Directory</h1>
                <UsersList users={users} />
            </section>
        );
    } catch (error) {
        console.error("Failed to fetch users:", error);
        notFound();
    }
}