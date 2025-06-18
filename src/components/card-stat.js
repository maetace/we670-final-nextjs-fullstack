// src/components/card-stat.js

import styles from '@/styles/dashboard.module.css';

export default function CardStat({ title, value }) {
    return (
        <div className={styles.card}>
            <h4 className={styles.cardTitle}>{title}</h4>
            <p className={styles.cardValue}>{value}</p>
        </div>
    );
}
