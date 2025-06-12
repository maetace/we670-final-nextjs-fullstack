// src/components/users-list.js

import Link from "next/link";
import Image from "next/image";

/**
 * UsersList - แสดงรายการผู้ใช้ในรูปแบบ Card Grid
 * @param {Array} users - รายการ users ที่จะนำมาแสดงผล
 */
export default function UsersList({ users }) {
    if (!Array.isArray(users) || users.length === 0) {
        return <p className="error">ไม่พบรายการผู้ใช้ หรือข้อมูลไม่ถูกต้อง</p>;
    }

    return (
        <div className="container">
            <ul className="users">
                {users.map((user) => (
                    <li key={user.uid} className="user">
                        <Link href={`/users/${user.uid}`}>
                            <div className="user-id">
                                <Image
                                    src={user.avatar}
                                    alt={`Avatar of ${user.fullname}`}
                                    width={300}
                                    height={300}
                                    className="user-avatar"
                                    unoptimized
                                />
                                <div className="user-name">
                                    {user.fullname} ({user.username})
                                </div>
                                <div className="user-email">Email: {user.email}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}