// src/app/(public)/dashboard/page.js

'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/dashboard.module.css';
import UsersChart from '@/components/users-chart';
import UsersCard from '@/components/users-card';
// import UsersRoleChart from '@/components/users-role-chart';
import UsersAgeChart from '@/components/users-age-chart';

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/stats')
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => setStats(data))
            .catch((err) => {
                console.error('Failed to fetch stats:', err);
                setError('Failed to fetch statistics');
            });
    }, []);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            {stats && (
                <>
                    <div className={styles.cardsContainer}>
                        <UsersCard label="Total Users" value={stats.total} />
                        <UsersCard label="Male Users" value={stats.byGender?.male || 0} />
                        <UsersCard label="Female Users" value={stats.byGender?.female || 0} />
                        <UsersCard label="N/A Gender" value={stats.byGender?.unknown || 0} />
                    </div>

                    <div className={styles.chartContainer}>
                        <div className={styles.chartBox}>
                            <UsersChart stats={stats.byStatus} />
                        </div>
                        {/* <div className={styles.chartBox}> */}
                        {/* <UsersRoleChart stats={stats.byRole} /> */}
                        {/* </div> */}
                        <div className={styles.chartBox}>
                            <UsersAgeChart stats={stats.byAgeGroup} />
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}