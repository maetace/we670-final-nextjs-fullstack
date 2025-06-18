// src/components/users-card.js

'use client';

import styles from '@/styles/users-card.module.css';

export default function UsersCard({ label, value }) {
    return (
        <div className={styles.card}>
            <h2>{label}</h2>
            <p>{value}</p>
        </div>
    );
}