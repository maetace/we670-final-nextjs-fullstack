// src/components/users-chart.js

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '@/styles/users-chart.module.css';

export default function UsersChart({ stats }) {
    const data = Object.entries(stats).map(([status, count]) => ({ status, count }));

    return (
        <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FFD700" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}