// src/components/users-age-chart.js

'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Label, LabelPosition, } from 'recharts';
import styles from '@/styles/users-chart.module.css';

const COLORS = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#ADFF2F', '#FF4500', '#32CD32'];

export default function UsersAgeChart({ stats }) {
    const data = Object.entries(stats).map(([ageRange, count]) => ({
        name: ageRange,
        value: count,
    }));

    return (
        <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        <Label position="center" style={{ fontSize: '16px' }}>Age</Label>

                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}