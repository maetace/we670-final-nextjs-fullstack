// src/components/modal-backdrop.js

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ModalBackdrop - ส่วนประกอบ modal สำหรับแสดง overlay แบบเต็มหน้าจอ
 * ปิด modal ได้เมื่อคลิกพื้นที่ด้านนอกหรือกดปุ่ม Esc
 * 
 * @param {React.ReactNode} children - เนื้อหาภายใน modal
 */
export default function ModalBackdrop({ children }) {
    const router = useRouter();

    // คลิกพื้นหลังเพื่อปิด modal
    const handleBackdropClick = () => {
        router.back();
    };

    // ป้องกันการคลิกทะลุ modal
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    // ปิด modal เมื่อกด Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') router.back();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [router]);

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <dialog open className="modal" onClick={handleModalClick}>
                {children}
            </dialog>
        </div>
    );
}