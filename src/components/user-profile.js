// src/components/user-profile.js

import Link from "next/link";
import Image from "next/image";

export default function UserProfile({ user }) {
    const age = new Date().getFullYear() - new Date(user.birthday).getFullYear();

    return (
        <div className="user-profile-container">
            <ul className="users">
                <li className="user">
                    <Link href={`/users/${user.uid}/image`}>
                        <Image
                            src={user.avatar}
                            alt={user.fullname}
                            width={300}
                            height={300}
                            className="user-avatar"
                            unoptimized
                        />
                    </Link>
                    <div className="user-name">{user.fullname} ({user.username})</div>
                    <div className="user-email">Email: {user.email}</div>
                    <hr />
                    <div className="user-info">Mobile: {user.mobile}</div>
                    <div className="user-info">Gender: {user.gender}</div>
                    <div className="user-info">Birthday: {new Date(user.birthday).toLocaleDateString()}</div>
                    <div className="user-info">Age: {age} years old</div>
                </li>
            </ul>
        </div >
    );
}