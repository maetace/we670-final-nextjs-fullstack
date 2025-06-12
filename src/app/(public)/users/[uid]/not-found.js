// src/app/(public)/users/[uid]/not-found.js

import Image from "next/image";
import Link from "next/link";

export default function notFound() {
    return (
        <main id="home">
            <Image
                src="https://i.postimg.cc/J43Y2TSP/logo.png"
                alt="Thunderbolts* Logo"
                width={200}
                height={80}
                className="home-image"
            />

            <h1>Users Not Found</h1>

            <p>UID that you&apos;re looking for does not exist.</p>

            <Link href="/users">Back to Directory</Link>
        </main>
    );
}