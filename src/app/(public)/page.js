// src/app/(public)/page.js

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <main id="home">
            <Image
                src="https://i.postimg.cc/J43Y2TSP/logo.png"
                alt="Thunderbolts* Logo"
                width={200}
                height={80}
                className="home-image"
            />

            <h1>Thunderbolts* Directory</h1>

            <p>
                ระบบสารบบสมาชิก Thunderbolts ทีมปฏิบัติการพิเศษของหน่วยงานไม่ระบุตัวตน<br />
                พัฒนาด้วย Next.js Full-stack รองรับการจัดการข้อมูลสมาชิก
            </p>

            <Link href="/users">เข้าสู่ระบบ Directory</Link>
        </main>
    );
}