import { getUserById, getAllUsers, updateUser, deleteUser } from '@/db/users';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ตาม UID (public)
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
        const targetUser = await getUserById(params.uid);
        if (!targetUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return Response.json(targetUser);
    } catch (error) {
        console.error('❌ Error loading user:', error);
        return new Response(JSON.stringify({ message: 'Failed to load user' }), { status: 500 });
    }
}

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: แก้ไขข้อมูลผู้ใช้ตาม UID (login required)
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
 *               username: { type: string }
 *               password: { type: string }
 *               email: { type: string }
 *               mobile: { type: string }
 *               avatar: { type: string }
 *               fullname: { type: string }
 *               birthday: { type: string, format: date }
 *               gender: { type: string, enum: [male, female] }
 *               status: { type: string, enum: [active, inactive, pending, banned, deleted] }
 *               role: { type: string, enum: [member, admin] }
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *       401:
 *         description: ต้องเข้าสู่ระบบก่อน
 *       403:
 *         description: ไม่มีสิทธิ์เข้าถึง
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
        const cookieStore = cookies();
        const sessionUid = cookieStore.get('session_uid')?.value;

        if (!sessionUid) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

        const sessionUser = await getUserById(sessionUid);
        if (!sessionUser || sessionUser.status !== 'active') {
            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        }

        if (sessionUser.role !== 'admin' && sessionUser.uid !== uid) {
            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        }

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
 *     summary: ลบผู้ใช้ตาม UID (login required)
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
 *       401:
 *         description: ต้องเข้าสู่ระบบก่อน
 *       403:
 *         description: ไม่มีสิทธิ์เข้าถึง
 *       500:
 *         description: ลบล้มเหลว
 */
export async function DELETE(_, { params }) {
    try {
        const cookieStore = cookies();
        const sessionUid = cookieStore.get('session_uid')?.value;

        if (!sessionUid) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

        const sessionUser = await getUserById(sessionUid);
        if (!sessionUser || sessionUser.status !== 'active') {
            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        }

        if (sessionUser.role !== 'admin' && sessionUser.uid !== params.uid) {
            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        }

        await deleteUser(params.uid);
        return new Response(JSON.stringify({ message: 'User deleted' }));
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        return new Response(JSON.stringify({ message: 'Failed to delete user' }), { status: 500 });
    }
}