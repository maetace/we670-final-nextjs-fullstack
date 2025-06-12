// seed/seed-users.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../src/db/data.db');
const db = new Database(dbPath);

const users = [
    {
        uid: 'U001',
        username: 'yelena',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'yelena.b@thunderbolts.org',
        mobile: '+66123456001',
        avatar: 'https://i.postimg.cc/hP5p4gfx/yelena.jpg',
        fullname: 'Yelena Belova',
        birthday: '1989-06-15',
        gender: 'female',
        status: 'active',
        role: 'member'
    },
    {
        uid: 'U002',
        username: 'buckybarnes',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'james.b@thunderbolts.org',
        mobile: '+66123456002',
        avatar: 'https://i.postimg.cc/t48Skyby/buckybarnes.jpg',
        fullname: 'James Barnes',
        birthday: '1917-03-10',
        gender: 'male',
        status: 'active',
        role: 'member'
    },
    {
        uid: 'U003',
        username: 'redguardian',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'alexei.s@thunderbolts.org',
        mobile: '+66123456003',
        avatar: 'https://i.postimg.cc/mkdVHWjv/redguardian.jpg',
        fullname: 'Alexei Shostakov',
        birthday: '1967-11-22',
        gender: 'male',
        status: 'active',
        role: 'member'
    },
    {
        uid: 'U004',
        username: 'usagent',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'john.w@thunderbolts.org',
        mobile: '+66123456004',
        avatar: 'https://i.postimg.cc/WpS5K0V5/usagent.jpg',
        fullname: 'John Walker',
        birthday: '1986-07-10',
        gender: 'male',
        status: 'active',
        role: 'member'
    },
    {
        uid: 'U005',
        username: 'ghost',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'ava.s@thunderbolts.org',
        mobile: '+66123456005',
        avatar: 'https://i.postimg.cc/7Z5tShpm/ghost.jpg',
        fullname: 'Ava Starr',
        birthday: '1988-08-24',
        gender: 'female',
        status: 'active',
        role: 'member'
    },
    {
        uid: 'U006',
        username: 'taskmaster',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'antonia.d@thunderbolts.org',
        mobile: '+66123456006',
        avatar: 'https://i.postimg.cc/Hxyg0T7G/taskmaster.jpg',
        fullname: 'Antonia Dreykov',
        birthday: '1996-05-19',
        gender: 'female',
        status: 'deleted',
        role: 'member'
    },
    {
        uid: 'U007',
        username: 'justbob',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'bob.r@thunderbolts.org',
        mobile: '+66123456007',
        avatar: 'https://i.postimg.cc/sD60B70M/justbob.jpg',
        fullname: 'Bob Reynolds',
        birthday: '1987-04-10',
        gender: 'male',
        status: 'pending',
        role: 'member'
    },
    {
        uid: 'U008',
        username: 'valentina',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'valentina.a@thunderbolts.org',
        mobile: '+66123456008',
        avatar: 'https://i.postimg.cc/VL6Kc5Lm/valentina.jpg',
        fullname: 'Valentina Allegra de Fontaine',
        birthday: '1971-12-19',
        gender: 'female',
        status: 'active',
        role: 'admin'
    },
    {
        uid: 'U009',
        username: 'melgold',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'melissa.g@thunderbolts.org',
        mobile: '+66123456009',
        avatar: 'https://i.postimg.cc/bJh6XTdB/melgold.jpg',
        fullname: 'Melissa Gold',
        birthday: '1994-10-28',
        gender: 'female',
        status: 'inactive',
        role: 'admin'
    },
    {
        uid: 'U010',
        username: 'baronzemo',
        password: bcrypt.hashSync('P@ssw0rd', 10),
        email: 'helmut.z@thunderbolts.org',
        mobile: '+66123456010',
        avatar: 'https://i.postimg.cc/DyyMyB5V/baronzemo.jpg',
        fullname: 'Helmut Zemo',
        birthday: '1978-09-03',
        gender: 'male',
        status: 'banned',
        role: 'member'
    }
];

const stmt = db.prepare(`
  INSERT INTO users (
    uid, username, password, email, mobile, avatar,
    fullname, birthday, gender, status, role,
    created_at, updated_at
  ) VALUES (
    @uid, @username, @password, @email, @mobile, @avatar,
    @fullname, @birthday, @gender, @status, @role,
    datetime('now'), datetime('now')
  )
`);

const insertMany = db.transaction((users) => {
    for (const user of users) {
        stmt.run(user);
    }
});

insertMany(users);

console.log(`✅ Seeded ${users.length} users into data.db`);