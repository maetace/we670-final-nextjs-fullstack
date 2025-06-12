// src/app/(public)/users/[uid]/@modal/(.)image/page.js

import ModalBackdrop from '@/components/modal-backdrop';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function InterceptedImageModal({ params }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/users/${params.uid}`, {
        // ป้องกัน cache เพราะข้อมูล user อาจเปลี่ยน
        cache: 'no-store',
    });

    if (!res.ok) notFound();

    const user = await res.json();

    return (
        <ModalBackdrop>
            <Image
                src={user.avatar}
                alt={`Avatar of ${user.fullname}`}
                width={800}
                height={800}
                className="modal-image"
                unoptimized
            />
        </ModalBackdrop>
    );
}