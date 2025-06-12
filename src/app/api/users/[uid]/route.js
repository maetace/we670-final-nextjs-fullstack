// src/app/api/users/[uid]/route.js

import { getUserById, getAllUsers, updateUser, deleteUser } from '@/db/users';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ตาม UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: รหัสผู้ใช้
 *     responses:
 *       200:
 *         description: ข้อมูลผู้ใช้
 *       404:
 *         description: ไม่พบผู้ใช้
 *       500:
 *         description: ดึงข้อมูลล้มเหลว
 */
export async function GET(_, { params }) {
    try {
        const user = await getUserById(params.uid);

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return Response.json(user);
    } catch (error) {
        console.error('Error loading user:', error);
        return new Response(JSON.stringify({ message: 'Failed to load user' }), { status: 500 });
    }
}

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: แก้ไขข้อมูลผู้ใช้ตาม UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: รหัสผู้ใช้
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               avatar:
 *                 type: string
 *               fullname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending, banned, deleted]
 *               role:
 *                 type: string
 *                 enum: [member, admin]
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description: ไม่พบผู้ใช้
 *       409:
 *         description: username หรือ email ซ้ำ
 *       500:
 *         description: อัปเดตล้มเหลว
 */
export async function PUT(request, { params }) {
    try {
        const uid = params.uid;
        const updates = await request.json();

        const existingUser = await getUserById(uid);
        if (!existingUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const allUsers = await getAllUsers();
        const isUsernameTaken = updates.username &&
            allUsers.some(u => u.username === updates.username && u.uid !== uid);
        const isEmailTaken = updates.email &&
            allUsers.some(u => u.email === updates.email && u.uid !== uid);

        if (isUsernameTaken) {
            return new Response(JSON.stringify({ message: 'Username already taken' }), { status: 409 });
        }

        if (isEmailTaken) {
            return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
        }

        if (updates.password) {
            updates.password = bcrypt.hashSync(updates.password, 10);
        }

        await updateUser(uid, updates);
        return new Response(JSON.stringify({ message: 'User updated' }));
    } catch (error) {
        console.error('❌ Error updating user:', error);
        return new Response(JSON.stringify({ message: 'Failed to update user' }), { status: 500 });
    }
}

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: ลบผู้ใช้ตาม UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: รหัสผู้ใช้
 *     responses:
 *       200:
 *         description: ลบผู้ใช้สำเร็จ
 *       500:
 *         description: ลบล้มเหลว
 */
export async function DELETE(_, { params }) {
    try {
        await deleteUser(params.uid);
        return new Response(JSON.stringify({ message: 'User deleted' }));
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        return new Response(JSON.stringify({ message: 'Failed to delete user' }), { status: 500 });
    }
}