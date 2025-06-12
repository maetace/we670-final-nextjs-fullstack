# **เอกสารประกอบ : โครงงาน Next.js (30 คะแนน)**

# **1. ข้อมูลเบื้องต้น**

| ชื่อระบบงาน:  | Thunderbolts* Directory |
| :---- | :---- |
| ผู้จัดทำ: | เมธี นิลรัตน์ (67130893) |
| วิชา: | WE670 - การพัฒนาเว็บแอปพลิเคชันขั้นสูง |
| อาจาร์ผู้สอน: | Chaloemphon Sirikayon |
| วันที่สั่งงาน: | 24/05/2025 |
| กำหนดส่งงาน: | 27/06/2025 11:59 PM |
| คะแนน: | 30 คะแนน |
| งาน -: | ให้นักศึกษาพัฒนาเว็บแอปพลิเคชันเต็มรูปแบบ ที่มีการทำงานทั้งส่วน front-end และ back-end 1 ระบบงาน ด้วยการใช้ Next.js โดยให้มีการติดต่อฐานข้อมูล เพื่อนำข้อมูลมาใช้งาน เพิ่มม ลบ และแก้ไขข้อมูลได้ และมีการทำ User Authentication เพื่อเข้าใช้งานส่วนของเว็บแอปพลิเคชันตามที่ออกแบบไว้ได้ |
| สิ่งที่ต้องส่ง -: | 1.  เอกสารโครงงาน จัดทำเป็นไฟล์ word และ pdf ประกอบด้วย 	1.1  ชื่อระบบงาน, ผู้จัดทำ 	1.2  รายละเอียด และ วัตถุประสงค์การใช้งาน 	1.3  โครงสร้างฐานข้อมูล ER Diagram 	1.4  ผลลัพธ์ของการพัฒนา (หน้าจอ, คำอธิบายรายละเอียดการใช้งานบนหน้าเว็บ) 2.  นำไฟล์ขึ้น Github สร้าง repository แบบ public แล้วส่ง URL 3.  สไลด์พรีเซนเตชัน (พรีเซนไม่เกิน 5 นาที) |

# **2. วัตถุประสงค์และขอบเขตของระบบ**

	• สรุปวัตถุประสงค์: เพื่อสร้างระบบจัดการสมาชิก (Directory System) แบบ Full-stack  
	• ขอบเขตการใช้งาน: รองรับ CRUD, Auth, Modal UI, Dashboard, และ REST API

# **3. รายละเอียดของระบบ**

	• ประเภทระบบ: Full-stack Web Application  
	• เทคโนโลยีหลัก: Next.js (App Router), SQLite, better-sqlite3, Tailwind CSS  
	• รูปแบบการทำงาน: เชื่อมต่อฐานข้อมูลจริง \+ มีการแบ่งกลุ่มเส้นทางด้วย Route Group

# **4. โครงสร้างโฟลเดอร์โปรเจกต์**

## **1) สร้างโปรเจกต์**

• สั่ง npx create-next-app@latest we670-final-nextjs-fullstack เพื่อเริ่มโปรเจค  
	โดยเลือกดังนี้  
	• Use TypeScript? `No`  
	• Use ESLint? `Yes`  
	• Use Tailwind CSS? `Yes`  
	• Use src/ directory? `Yes`  
	• Use App Router? `Yes`  
	• Customize alias (@) `No`  
	• Use Turbopack? `No`

## **2) วางโครงสร้างโฟลเดอร์และไฟล์**

```  
.  
├── seed  
│   ├── create-db.js  
│   └── seed-users.js  
├── src  
│   ├── app  
│   │   ├── (admin)  
│   │   │   ├── auth  
│   │   │   │   ├── auth.module.css  
│   │   │   │   └── page.js  
│   │   │   ├── layout.js  
│   │   │   └── user  
│   │   ├── (public)  
│   │   │   ├── layout.js  
│   │   │   ├── loading.js  
│   │   │   ├── page.js  
│   │   │   └── users  
│   │   │       ├── \[uid\]  
│   │   │       │   ├── @modal  
│   │   │       │   │   ├── (.)image  
│   │   │       │   │   │   ├── loading.js  
│   │   │       │   │   │   └── page.js  
│   │   │       │   │   └── default.js  
│   │   │       │   ├── image  
│   │   │       │   │   └── page.js  
│   │   │       │   ├── layout.js  
│   │   │       │   ├── loading.js  
│   │   │       │   ├── not-found.js  
│   │   │       │   └── page.js  
│   │   │       ├── active  
│   │   │       │   └── page.js  
│   │   │       ├── loading.js  
│   │   │       └── page.js  
│   │   ├── api  
│   │   │   ├── auth  
│   │   │   │   ├── login  
│   │   │   │   │   └── route.js  
│   │   │   │   └── logout  
│   │   │   │       └── route.js  
│   │   │   ├── session  
│   │   │   │   └── route.js  
│   │   │   ├── swagger  
│   │   │   │   └── route.js  
│   │   │   └── users  
│   │   │       ├── \[uid\]  
│   │   │       │   └── route.js  
│   │   │       └── route.js  
│   │   ├── docs  
│   │   │   └── page.js  
│   │   ├── globals.css  
│   │   ├── layout.js  
│   │   └── not-found.js  
│   ├── components  
│   │   ├── main-header.js  
│   │   ├── modal-backdrop.js  
│   │   ├── nav-link.js  
│   │   ├── user-profile.js  
│   │   └── users-list.js  
│   ├── db  
│   │   ├── data.db  
│   │   └── users.js  
│   └── swagger  
│       ├── swagger-config.js  
│       └── swagger-doc.js  
├── .env.local  
├── eslint.config.mjs  
├── jsconfig.json  
├── middleware.js  
├── next.config.mjs  
├── package-lock.json  
├── package.json  
├── postcss.config.mjs  
└── README.md  
```

## **3) Git Commit**

```bash  
git init  
git add .  
git commit -m "Step 1: Initialize project and folder structure"  
git branch -M main  
git remote add origin git@github.com:maetace/we670-final-nextjs-fullstack.git  
git push -u origin main  
```

## **4) Deploy ขึ้น Vercel**

	• เข้าสู่ https://vercel.com  
	• Connect GitHub Repo \> we670-final-nextjs-fullstack  
	• Deploy สำเร็จ \> https://we670-final-nextjs-fullstack.vercel.app/

# **5. วางโครงสร้างฐานข้อมูล ER Diagram**

## **1) Table Users**

| Field Name | Data Type | Constraints |
| :---- | :---- | :---- |
| uid | TEXT | PRIMARY KEY |
| username | TEXT | UNIQUE, NOT NULL |
| password | TEXT | NOT NULL |
| email | TEXT | UNIQUE, NOT NULL |
| mobile | TEXT | - |
| avatar | TEXT | URL |
| fullname | TEXT | - |
| birthday | TEXT (ISO Date) | YYYY-MM-DD |
| gender | TEXT | CHECK ENUM |
| status | TEXT | CHECK, DEFAULT 'active', inactive, pending, banned, deleted |
| role | TEXT | CHECK, DEFAULT 'member', admin |
| created_at | TEXT (Timestamp) | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TEXT (Timestamp) | DEFAULT CURRENT_TIMESTAMP |
| last_login | TEXT (Timestamp) | NULLABLE |

# **6. การสร้างและเตรียมฐานข้อมูล**

## **1) ติดตั้ง Library ฐานข้อมูล better-sqlite3**

	• npm install better-sqlite3

## **2) สร้างฐานข้อมูล ตามที่ออกแบบไว้**

	• เตรียม seed/[create-db.js](http://create-db.js)  
	• สั่ง node seed/[create-db.js](http://create-db.js) เพื่อสร้างฐานข้อมูล   
	• ได้ฐานข้อมูล src/db/[data.db](http://data.db)

# **3) insert mock data**

	• เตรียม seed/[seed-users.js](http://seed-users.js)  
	• สั่ง node seed/[seed-users.js](http://seed-users.js) เพื่อนำเข้าฐานข้อมูล

# **7. พัฒนา REST API (Back-end)**

## **1) ตารางสรุป REST API Endpoint**

| Method | URL Path | Description |
| :---- | :---- | :---- |
| GET | /api/users | ดึง users ทั้งหมด (รองรับ filter) |
| GET | /api/users/:uid | ดึง user รายบุคคล |
| POST | /api/users | เพิ่ม user |
| PUT | /api/users/:uid | แก้ไข user |
| DELETE | /api/users/:uid | ลบ user (จริงหรือ soft delete ก็ได้) |
| POST | /api/auth/login | เข้าสู่ระบบ |
| GET | /api/auth/session | ดึงข้อมูล session ปัจจุบัน |
| POST | /api/auth/logout | ออกจากระบบ |

## **2) API route**

	• ออกแบบตาม RESTful Best Practices  
	• ใช้ async/await ทั้งหมดเพื่อความชัดเจน  
	• ทำงานภายใต้ App Router ซึ่งรองรับ Edge หรือ Serverless  
	• รองรับ CORS เมื่อใช้ผ่าน frontend ต่าง origin (ถ้าต้องการในอนาคต)  
	• ป้องกัน undefined/null ด้วย error handling \+ ตรวจสอบ params.uid เสมอ

## **3) ติดตั้ง Swagger เพื่อต่อยอดในอนาคต**

	• ติดตั้ง dependency  
		• npm install swagger-jsdoc@6  
		• npm install swagger-ui-dist  
	• สร้าง Swagger Spec  
		• src/swagger/[swagger-config.js](http://swagger-config.js)  
		• src/swagger/[swagger-doc.js](http://swagger-doc.js)  
	•  สร้าง API Endpoint  
		• src/app/api/docs/[route.js](http://route.js)  
	• JSDoc ในไฟล์ API ทุกไฟล์  
	• API Docs  
		• src/app/docs/[page.js](http://page.js)  
		• [http://localhost:3000/docs](http://localhost:3000/docs)

# **8. พัฒนา Front-end Application**

	• Home (src/app/(public)/page.js)  

[![we670-final-nextjs-fullstack-home.png](https://i.postimg.cc/Y0ZXsNGk/we670-final-nextjs-fullstack-home.png)](https://postimg.cc/hQ8bJd13)

	• Users (src/app/(public)/users/page.js)

[![we670-final-nextjs-fullstack-users.png](https://i.postimg.cc/DwqCxX2k/we670-final-nextjs-fullstack-users.png)](https://postimg.cc/NKj7ML9p)

•  Active User (src/app/(public)/users/active/page.js)

[![we670-final-nextjs-fullstack-active.png](https://i.postimg.cc/7Zvs1Vrn/we670-final-nextjs-fullstack-active.png)](https://postimg.cc/CzNsSb1R)

	•  User Profile (src/app/(public)/users/\[uid\]/[page.js](http://page.js))

[![we670-final-nextjs-fullstack-profile.png](https://i.postimg.cc/QNynCD6P/we670-final-nextjs-fullstack-profile.png)](https://postimg.cc/Bt2C7rfc)

•  User Avatar (src/app/(public)/users/\[uid\]/@modal/(.)image/[page.js](http://page.js))

[![we670-final-nextjs-fullstack-modal.png](https://i.postimg.cc/wTR4srZB/we670-final-nextjs-fullstack-modal.png)](https://postimg.cc/561Shsxc)

# **9. ระบบ Authentication & Authorization**

	• Login/Logout ด้วย Session Cookie  
	• Middleware ป้องกัน admin route  
	• Hash Password ด้วย bcrypt  
	• เชื่อมโยง session เข้ากับ user

# **10. ระบบ CRUD สมาชิก**

	• เพิ่ม / แก้ไข / ลบ User (Soft delete / Permanent)  
	• แสดงสถานะ Active, Banned, Deleted  
	• ใช้แบบฟอร์มพร้อม Validate

# **11. Dashboard & Statistics**

	• จำนวนผู้ใช้ตามสถานะ  
	• เพศ / ช่วงอายุ / วันเกิด  
	• Recent Login

# **12. สรุปผลและแนวทางพัฒนาต่อ**