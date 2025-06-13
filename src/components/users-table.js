// src/components/users-table.js

'use client';

import styles from '@/styles/users-table.module.css';
import Link from 'next/link';

export default function UsersTable({ users, onEdit, onDelete }) {
    return (
        <table className={styles.table}>
            <thead className={styles.h}>
                <tr>
                    <th>UID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.uid}>
                        <td>{user.uid}</td>
                        <td>{user.username}</td>
                        <td>{user.fullname}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                        <td>
                            <button
                                className={styles.edit}
                                onClick={() => onEdit(user)}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.delete}
                                onClick={() => onDelete(user.uid)}
                            >
                                Delete
                            </button>
                            <Link className={styles.view} href={`/users/${user.uid}`} target="_blank">
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}