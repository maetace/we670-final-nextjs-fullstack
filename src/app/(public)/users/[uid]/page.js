// src/app/(public)/users/[uid]/page.js

export const dynamic = 'force-dynamic';

import UserProfile from "@/components/user-profile";
import { notFound } from "next/navigation";

export default async function UserProfilePage({ params }) {
    const { uid } = params;

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/api/users/${uid}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) notFound();

        const user = await res.json();

        if (!user) notFound();

        return (
            <section>
                <h1>Thunderbolts* Profile</h1>
                <UserProfile user={user} />
            </section>
        );
    } catch (error) {
        console.error("❌ Failed to fetch user:", error);
        notFound();
    }
}