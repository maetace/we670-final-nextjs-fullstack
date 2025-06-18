// src/components/users-role-chart.js

'use client';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from '@/styles/users-role-chart.module.css';

const COLORS = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#ADFF2F'];

export default function UsersRoleChart({ stats }) {
    const data = Object.entries(stats).map(([role, count]) => ({ name: role, value: count }));

    return (
        <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        <Label>Roles</Label>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div >
    );
}