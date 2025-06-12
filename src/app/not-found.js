// src/app/not-found.js

import Image from "next/image";
import Link from "next/link";

/**
 * หน้า 404 (Not Found)
 */
export default function NotFoundPage() {
    return (
        <main id="home">
            <Image
                src="https://i.postimg.cc/J43Y2TSP/logo.png"
                alt="Thunderbolts* Logo"
                width={200}
                height={80}
                className="home-image"
            />

            <h1>Page Not Found</h1>

            <p>ไม่พบหน้าที่คุณร้องขอ หรือ URL อาจไม่ถูกต้อง</p>

            <Link href="/">กลับหน้าแรก</Link>
        </main>
    );
}