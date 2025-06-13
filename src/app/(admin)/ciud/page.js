// src/app/(admin)/ciud/page.js

'use client';

import styles from '@/styles/ciud.module.css';

import { useEffect, useState } from 'react';
import UsersTable from '@/components/users-table';
import UserForm from '@/components/user-form';

export default function AdminCIUDPage() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError('❌ Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAdd = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDelete = async (uid) => {
        if (!confirm(`Delete user ${uid}?`)) return;

        const res = await fetch(`/api/users/${uid}`, { method: 'DELETE' });
        if (res.ok) {
            fetchUsers();
        } else {
            setError('❌ Failed to delete user');
        }
    };

    const handleFormSubmit = async (user) => {
        const isEdit = !!editingUser;
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `/api/users/${editingUser.uid}` : '/api/users';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (res.ok) {
            setShowForm(false);
            fetchUsers();
        } else {
            setError('❌ Failed to save user');
        }
    };

    return (
        <main className={styles.container}>
            <h1>CIUD: Manage Users</h1>

            <button className={styles.btnAdd} onClick={handleAdd}>
                + Add New User
            </button>

            {error && <p className={styles.error}>{error}</p>}

            {showForm ? (
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                />
            ) : (
                <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </main>
    );
}