// src/app/(content)/users/[uid]/image/page.js

import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ImagePage({ params }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/users/${params.uid}`, {
        cache: 'no-store',
    });

    if (!res.ok) notFound();

    const user = await res.json();

    return (
        <div className="fullscreen-container">
            <Image
                src={user.avatar}
                alt={user.fullname}
                width={400}
                height={400}
                className="fullscreen-image"
                unoptimized
            />
        </div>
    );
}