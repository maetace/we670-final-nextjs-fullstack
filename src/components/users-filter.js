// src/components/users-filter.js

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from '@/styles/users-filter.module.css';

export default function UsersFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const gender = searchParams.get('gender') || '';
    const status = searchParams.get('status') || '';
    const role = searchParams.get('role') || '';

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        router.replace(`/users?${params.toString()}`);
    };

    return (
        <div className={styles.filters}>
            <select name="gender" value={gender} onChange={handleFilterChange} className={styles.select}>
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select name="status" value={status} onChange={handleFilterChange} className={styles.select}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
                <option value="deleted">Deleted</option>
            </select>

            <select name="role" value={role} onChange={handleFilterChange} className={styles.select}>
                <option value="">All Roles</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    );
}
