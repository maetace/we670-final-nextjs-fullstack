// src/app/(content)/users/[uid]/page.js

import UserProfile from "@/components/user-profile";
import { notFound } from "next/navigation";

export default async function UserProfilePage({ params }) {
    const { uid } = params;

    const res = await fetch(`${process.env.BASE_URL}/api/users/${uid}`, { cache: 'no-store' });

    if (!res.ok) notFound();

    const user = await res.json();

    return (
        <section>
            <h1>Thunderbolts* Profile</h1>
            <UserProfile user={user} />
        </section>
    );
}