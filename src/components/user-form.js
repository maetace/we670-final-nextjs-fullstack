// src/components/user-form.js

'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/user-form.module.css';

export default function UserForm({ user = null, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        mobile: '-',
        avatar: 'https://i.postimg.cc/QM56nPN7/default.jpg',
        fullname: '-',
        birthday: '2000-01-01',
        gender: 'male',
        status: 'active',
        role: 'member',
    });

    const usernameRef = useRef();

    useEffect(() => {
        if (user) {
            setForm({ ...user, password: '' });
        }
    }, [user]);

    useEffect(() => {
        // ✅ โฟกัสช่อง username เมื่อโหลดหน้า
        usernameRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <h2 className={styles.heading}>{user ? 'Edit User' : 'Add New User'}</h2>

            <div className={styles.field}>
                <label htmlFor="username">Username<span>*</span></label>
                <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    ref={usernameRef}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="password">Password{!user && <span>*</span>}</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required={!user}
                    autoComplete="new-password"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="email">Email<span>*</span></label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="mobile">Mobile</label>
                <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="avatar">Avatar URL</label>
                <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    value={form.avatar}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="fullname">Full Name<span>*</span></label>
                <input
                    id="fullname"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="birthday">Birthday</label>
                <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={form.birthday}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" value={form.gender} onChange={handleChange}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={form.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="banned">Banned</option>
                    <option value="deleted">Deleted</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="role">Role</label>
                <select name="role" id="role" value={form.role} onChange={handleChange}>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className={styles.buttons}>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}