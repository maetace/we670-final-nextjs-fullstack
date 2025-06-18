# **เอกสารประกอบ : โครงงาน Next.js (30 คะแนน)**

# **1. ข้อมูลเบื้องต้น**

| ชื่อระบบงาน: | Thunderbolts* Directory |
| :---- | :---- |
| ผู้จัดทำ: | เมธี นิลรัตน์ (67130893) |
| วิชา: | WE670 - การพัฒนาเว็บแอปพลิเคชันขั้นสูง |
| อาจารย์ผู้สอน: | Chaloemphon Sirikayon |
| วันที่สั่งงาน: | 24/05/2025 |
| กำหนดส่งงาน: | 27/06/2025 11:59 PM |
| คะแนน: | 30 คะแนน |
| งาน -: | ให้นักศึกษาพัฒนาเว็บแอปพลิเคชันเต็มรูปแบบ ที่มีการทำงานทั้งส่วน front-end และ back-end 1 ระบบงาน ด้วยการใช้ Next.js โดยให้มีการติดต่อฐานข้อมูล เพื่อนำข้อมูลมาใช้งาน เพิ่ม ลบ และแก้ไขข้อมูลได้ และมีการทำ User Authentication เพื่อเข้าใช้งานส่วนของเว็บแอปพลิเคชันตามที่ออกแบบไว้ได้ |
| สิ่งที่ต้องส่ง -: | 1. เอกสารโครงงาน จัดทำเป็นไฟล์ word และ pdf ประกอบด้วย 	1.1 ชื่อระบบงาน, ผู้จัดทำ 	1.2 รายละเอียด และ วัตถุประสงค์การใช้งาน 	1.3 โครงสร้างฐานข้อมูล ER Diagram 	1.4 ผลลัพธ์ของการพัฒนา (หน้าจอ, คำอธิบายรายละเอียดการใช้งานบนหน้าเว็บ) 2. นำไฟล์ขึ้น Github สร้าง repository แบบ public แล้วส่ง URL 3. สไลด์พรีเซนเตชัน (พรีเซนต์ไม่เกิน 5 นาที) |

# **2. รายละเอียดและขอบเขตของระบบ**

## **2.1 รายละเอียดของระบบ:**

ระบบ Thunderbolts Directory เป็นระบบ Directory System แบบ Full-stack Web Application ที่พัฒนาด้วย Next.js (App Router) โดยมีการเชื่อมต่อฐานข้อมูลจริงด้วย SQLite ผ่าน Library better-sqlite3 รองรับการทำงานทั้งฝั่ง Front-end และ Back-end ในระบบเดียวกัน (Monorepo)

ตัวระบบออกแบบมาเพื่อเป็นระบบตัวอย่าง (Prototype) สำหรับจัดการข้อมูลผู้ใช้งาน (User Management) ซึ่งสามารถเพิ่ม แก้ไข ลบ และแสดงข้อมูลผู้ใช้งานได้อย่างครบถ้วน พร้อมระบบยืนยันตัวตน (Authentication & Authorization) เพื่อควบคุมสิทธิ์การเข้าใช้งาน

โครงสร้าง Routing ใช้ Route Group ใน Next.js เพื่อแบ่งส่วนการทำงานระหว่าง Public Section และ Admin Section อย่างชัดเจน 

นอกจากนี้ยังมีการพัฒนา REST API เพื่อรองรับการเชื่อมต่อกับ Front-end และการนำไปใช้งานร่วมกับระบบอื่นในอนาคตได้

ระบบมีการออกแบบ Dashboard & Statistics สำหรับแสดงข้อมูลสรุปผู้ใช้งานในรูปแบบกราฟและการ์ด เพื่อให้ผู้ดูแลระบบสามารถวิเคราะห์ข้อมูลผู้ใช้งานได้ง่าย

## **2.2 ขอบเขตของระบบ:**

ระบบ Thunderbolts Directory รองรับฟังก์ชันการทำงานดังนี้:

### **ระบบแสดงข้อมูลผู้ใช้งาน (Users Directory)**

•	แสดงรายชื่อผู้ใช้งานทั้งหมด (Users List)
•	แสดงรายละเอียดผู้ใช้งานรายบุคคล (User Profile)
•	แสดงรายชื่อผู้ใช้งานทั้งหมด (Users List)
•	กรองรายชื่อผู้ใช้งานตามเงื่อนไข: Gender, Status, Role
•	กรองรายชื่อผู้ใช้ได้แบบ หลายเงื่อนไขพร้อมกัน
•	แสดงภาพ Avatar ของผู้ใช้งานในรูปแบบ Modal โดยไม่ต้องเปลี่ยนหน้า
•	ใช้ Intercepting Route ของ Next.js App Router

### **ระบบจัดการข้อมูลผู้ใช้งาน (CRUD)**

•	เพิ่มข้อมูลผู้ใช้งาน
•	แก้ไขข้อมูลผู้ใช้งาน
•	ลบข้อมูลผู้ใช้งาน
•	แสดงข้อมูลผู้ใช้งาน

### **ระบบยืนยันตัวตน (Authentication & Authorization)**

•	รองรับการ Login / Logout ด้วย Session Cookie
•	ใช้ Middleware ป้องกันการเข้าถึง Route สำคัญ (เช่น Admin Section)
•	รองรับการแยก Role ผู้ใช้งาน (Admin / Member)

### **ระบบแสดงสถิติผู้ใช้งาน (Dashboard & Statistics)

•	แสดงการ์ดสรุปจำนวนผู้ใช้งาน
•	แสดงกราฟสถิติผู้ใช้งานแยกตาม Status, Gender, Age Group

### **บริการ REST API**

•	พัฒนา API ตามแนวทาง RESTful สำหรับใช้งานภายใน Front-end
•	รองรับการเชื่อมต่อจากภายนอกในอนาคต
•	จัดทำเอกสาร API ด้วย Swagger (JSDoc)

### **Deployment แบบ Cloud**

•	รองรับการ Deploy บน Vercel และ Render.com
•	เชื่อมต่อฐานข้อมูล SQLite ภายใน Container

# **3. วัตถุประสงค์ของระบบ**

## **3.1 วัตถุประสงค์การใช้งานระบบ**

ระบบ Thunderbolts Directory ออกแบบมาเพื่อให้ ผู้ใช้งาน (Admin หรือ Member) สามารถใช้งานระบบผ่านหน้าเว็บได้อย่างสะดวก โดยมีวัตถุประสงค์การใช้งานดังนี้:

•	เพื่อ เรียกดูรายชื่อผู้ใช้งาน ทั้งหมดในระบบ (Users List)
•	เพื่อ ค้นหาและกรองข้อมูลผู้ใช้งาน ตามเงื่อนไขต่าง ๆ เช่น เพศ (Gender), สถานะ (Status), บทบาท (Role)
•	เพื่อ ดูรายละเอียดผู้ใช้งานรายบุคคล (User Profile)
•	เพื่อ แก้ไข / เพิ่ม / ลบข้อมูลผู้ใช้งาน ผ่านหน้าจอที่ออกแบบให้ใช้งานง่าย (CRUD Interface)
•	เพื่อ แสดงภาพ Avatar ของผู้ใช้งาน ในรูปแบบ Modal ที่ไม่เปลี่ยน context หน้า
•	เพื่อ เข้าสู่ระบบอย่างปลอดภัย ด้วยการยืนยันตัวตน (Authentication)
•	เพื่อ ควบคุมสิทธิ์การเข้าถึง ส่วนต่าง ๆ ของระบบตาม Role ของผู้ใช้งาน (Authorization)
•	เพื่อ ดูสถิติและภาพรวมของผู้ใช้งาน ผ่านหน้า Dashboard (เช่น จำนวนผู้ใช้งาน, การกระจายตามสถานะ, เพศ, อายุ)

## **3.2 จุดประสงค์การพัฒนาระบบ**

โครงงานนี้มีจุดประสงค์เพื่อให้ ผู้พัฒนา (นักศึกษา) ได้เรียนรู้และฝึกฝนการพัฒนา Web Application แบบ Full-stack โดยมีเป้าหมายดังนี้:

•	เพื่อศึกษาและทดลองใช้ Next.js App Router สำหรับสร้าง Web Application ที่รวมทั้ง Front-end และ Back-end
•	เพื่อฝึกการออกแบบและเชื่อมต่อ ฐานข้อมูลจริง (SQLite) ด้วย Library better-sqlite3
•	เพื่อพัฒนา REST API ตามแนวทาง RESTful ใช้สำหรับทั้ง Front-end และสามารถเชื่อมต่อกับระบบภายนอกในอนาคต
•	เพื่อฝึกพัฒนา ระบบ Authentication & Authorization ที่มีความปลอดภัย
•	เพื่อเรียนรู้การใช้งาน Middleware และ Intercepting Route ใน Next.js
•	เพื่อออกแบบ UI/UX ที่ตอบโจทย์ผู้ใช้งาน โดยใช้ Tailwind CSS
•	เพื่อทดลองพัฒนา ระบบ Dashboard และสร้าง กราฟสถิติ (Charts)
•	เพื่อฝึกการจัดทำ เอกสาร API (Swagger) และเขียน JSDoc
•	เพื่อทดลองใช้งานระบบ Deployment บน Cloud เช่น Vercel และ Render.com
•	เพื่อพัฒนาทักษะการเขียนโค้ดให้เป็นระบบ (Clean Code) และการจัดโครงสร้าง Project ที่เป็นระเบียบ

# **4. โครงสร้างโฟลเดอร์โปรเจกต์**

## **4.1 สร้างโปรเจกต์**

•	สั่ง npx create-next-app@latest we670-final-nextjs-fullstack เพื่อเริ่มโปรเจค 
	โดยเลือกดังนี้ 
	•	Use TypeScript? `No` 
	•	Use ESLint? `Yes` 
	•	Use Tailwind CSS? `Yes` 
	•	Use src/ directory? `Yes` 
	•	Use App Router? `Yes` 
	•	Customize alias (@) `No` 
	•	Use Turbopack? `No`

## **4.2 วางโครงสร้างโฟลเดอร์และไฟล์**

``` 
.
├── src
│   ├── app
│   │   ├── (admin)
│   │   │   ├── auth
│   │   │   │   └── page.js
│   │   │   ├── ciud
│   │   │   │   └── page.js
│   │   │   └── layout.js
│   │   ├── (public)
│   │   │   ├── dashboard
│   │   │   │   ├── loading.js
│   │   │   │   └── page.js
│   │   │   ├── layout.js
│   │   │   ├── loading.js
│   │   │   ├── page.js
│   │   │   └── users
│   │   │   ├── [uid]
│   │   │   │   ├── @modal
│   │   │   │   │   ├── (.)image
│   │   │   │   │   │   ├── loading.js
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── default.js
│   │   │   │   ├── image
│   │   │   │   │   └── page.js
│   │   │   │   ├── layout.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── not-found.js
│   │   │   │   └── page.js
│   │   │   ├── loading.js
│   │   │   └── page.js
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── login
│   │   │   │   │   └── route.js
│   │   │   │   └── logout
│   │   │   │   └── route.js
│   │   │   ├── session
│   │   │   │   └── route.js
│   │   │   ├── stats
│   │   │   │   └── route.js
│   │   │   ├── swagger
│   │   │   │   └── route.js
│   │   │   └── users
│   │   │   ├── [uid]
│   │   │   │   └── route.js
│   │   │   └── route.js
│   │   ├── docs
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── not-found.js
│   ├── components
│   │   ├── card-stat.js
│   │   ├── main-header.js
│   │   ├── modal-backdrop.js
│   │   ├── nav-link.js
│   │   ├── user-form.js
│   │   ├── user-profile.js
│   │   ├── users-age-chart.js
│   │   ├── users-card.js
│   │   ├── users-chart.js
│   │   ├── users-filter.js
│   │   ├── users-list.js
│   │   ├── users-role-chart.js
│   │   └── users-table.js
│   ├── db
│   │   ├── data.db
│   │   ├── seed
│   │   │   ├── create-db.js
│   │   │   └── seed-users.js
│   │   └── users.js
│   ├── middleware.js
│   ├── styles
│   │   ├── auth.module.css
│   │   ├── ciud.module.css
│   │   ├── dashboard.module.css
│   │   ├── globals.css
│   │   ├── modal-backdrop.css
│   │   ├── user-form.module.css
│   │   ├── users-card.module.css
│   │   ├── users-chart.module.css
│   │   ├── users-filter.module.css
│   │   ├── users-role-chart.module.css
│   │   └── users-table.module.css
│   └── swagger
│   ├── swagger-config.js
│   └── swagger-doc.js
├── .env.local
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
```

## **4.3 Git Commit**

```bash 
git init 
git add . 
git commit -m "Step 1: Initialize project and folder structure" 
git branch -M main 
git remote add origin git@github.com:maetace/we670-final-nextjs-fullstack.git 
git push -u origin main 
```

## **4.4 Deploy ขึ้น Vercel**

•	เข้าสู่ [https://vercel.com](https://vercel.com/) 
•	Connect GitHub Repo > we670-final-nextjs-fullstack 
•	Deploy สำเร็จ > [https://we670-final-nextjs-fullstack.vercel.app/](https://we670-final-nextjs-fullstack.vercel.app/) 
•	ปัญหาที่พบ > “Read-Only” filesystem (Edit/Delete บน SQLite ไม่ได้)

## **4.5 Deploy ขึ้น Render**

•	เข้าสู่ [https://render.com](https://render.com) หน้า Dashboard 
•	Add new > Web Service 
•	Repo > we670-final-nextjs-fullstack 
•	ตั้งค่า: 
	•	Language: Node 
	•	Branch: Main 
	•	Root Directory: ว่างไว้ 
	•	Build Command: npm install; npm run build 
	•	Start Command: npm run start 
	•	Instance Type: Free 
	•	Environment Variables 
 •	Deploy สำเร็จ > https://we670-final-nextjs-fullstack.onrender.com/

# **5. วางโครงสร้างฐานข้อมูล ER Diagram**

## **5.1 Table Users**

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

การสร้างฐานข้อมูล และเตรียมข้อมูลเริ่มต้น มีขั้นตอนดังนี้:

## **6.1 ติดตั้ง Library ฐานข้อมูล better-sqlite3**

•	npm install better-sqlite3

## **6.2 สร้างฐานข้อมูลตามที่ออกแบบไว้**

•	เตรียม seed/[create-db.js](http://create-db.js) 
•	สั่ง node seed/[create-db.js](http://create-db.js) เพื่อสร้างฐานข้อมูล
•	ได้ฐานข้อมูล src/db/[data.db](http://data.db)

## 	**6.3 เตรียมข้อมูลตัวอย่าง (Insert Mock Data)**

•	เตรียม seed/[seed-users.js](http://seed-users.js) 
•	สั่ง node seed/[seed-users.js](http://seed-users.js) เพื่อนำเข้าฐานข้อมูล

# **7. พัฒนา REST API (Back-end)**

## **7.1 ตารางสรุป REST API Endpoint**

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

## **7.2 API route**

•	ออกแบบตาม RESTful Best Practices 
•	ใช้ async/await ทั้งหมดเพื่อความชัดเจน 
•	ทำงานภายใต้ App Router ซึ่งรองรับ Edge หรือ Serverless 
•	รองรับ CORS เมื่อใช้ผ่าน frontend ต่าง origin (ถ้าต้องการในอนาคต) 
•	ป้องกัน undefined/null ด้วย error handling + ตรวจสอบ params.uid เสมอ

## **7.3 ติดตั้ง Swagger เพื่อต่อยอดในอนาคต**

•	ติดตั้ง dependency 
	•	npm install swagger-jsdoc@6 
	•	npm install swagger-ui-dist 
•	สร้าง Swagger Spec 
	•	src/swagger/[swagger-config.js](http://swagger-config.js) 
	•	src/swagger/[swagger-doc.js](http://swagger-doc.js) 
•	สร้าง API Endpoint 
	•	src/app/api/docs/[route.js](http://route.js) 
•	JSDoc ในไฟล์ API ทุกไฟล์ 
•	API Docs 
	•	src/app/docs/[page.js](http://page.js) 
	•	[http://localhost:3000/docs](http://localhost:3000/docs)

# **8. ผลลัพธ์ของการพัฒนา (หน้าจอและคำอธิบายการใช้งาน)**

ส่วนนี้นำเสนอ ผลลัพธ์ของการพัฒนา โดยแสดงภาพหน้าจอ (Screenshot) พร้อมคำอธิบายรายละเอียดการใช้งานของระบบ Thunderbolts Directory

ซึ่งมีฟังก์ชันการทำงานหลัก ดังนี้:

•	หน้าหลัก (Home)
•	ระบบจัดการผู้ใช้งาน (Users CRUD)
•	ระบบฟิลเตอร์ค้นหา (Filter Gender / Status / Role)
•	ระบบ Modal สำหรับแสดง Avatar รายบุคคล
•	ระบบ Authentication & Authorization (Login / Logout / Session)
•	ระบบ Dashboard & Statistics

โดยภาพและคำอธิบายจะจัดแสดงในหัวข้อย่อยต่อไปนี้

## **8.1 หน้าหลัก (Home)**

หน้า Home แสดงชื่อระบบ Thunderbolts Directory และเมนูนำทาง (Navigation) ไปยังหน้าต่าง ๆ ของระบบ

[![01-home.png](https://i.postimg.cc/J0sVJF2L/01-home.png)](https://postimg.cc/zHYcYxNt)

## **8.2 รายชื่อผู้ใช้งาน (Users List)**

หน้า Users แสดงรายการผู้ใช้งานทั้งหมดในระบบ รองรับการแสดงข้อมูลแบบการ์ด (Card View) และแบบตาราง (Table View) พร้อมปุ่มเข้าสู่หน้า Profile รายบุคคล

[![02-users.png](https://i.postimg.cc/bwgh71b4/02-users.png)](https://postimg.cc/rDD3W0f9)

## **8.3 ฟิลเตอร์ค้นหา (Filter Gender / Status / Role)**

•	Filter Gender: หน้า Users รองรับการกรองข้อมูลผู้ใช้งานตามเพศ (Gender)

[![03-users-filter-gender.png](https://i.postimg.cc/zBsZC7ZH/03-users-filter-gender.png)](https://postimg.cc/R6LD9c0v)

•	Filter Gender & Status: สามารถกรองข้อมูลตามเพศและสถานะ (Status) ของผู้ใช้งาน

[![04-users-filter-status.png](https://i.postimg.cc/hjbbs4N8/04-users-filter-status.png)](https://postimg.cc/G8tyhRL9)

•	Filter Gender & Status & Role: สามารถกรองข้อมูลแบบหลายเงื่อนไข ได้แก่ เพศ, สถานะการใช้งาน, และบทบาท (Role) ของผู้ใช้งาน

[![05-users-filter-role.png](https://i.postimg.cc/6qMVsjWy/05-users-filter-role.png)](https://postimg.cc/zHRHKkRr)

## **8.4 รายละเอียดผู้ใช้งาน (User Profile)**

หน้า Profile รายบุคคล แสดงข้อมูลรายละเอียดของผู้ใช้งานแต่ละคน

[![06-user-profile.png](https://i.postimg.cc/XJ8dFHyQ/06-user-profile.png)](https://postimg.cc/cgvvGchn)

## **8.5 Modal Avatar รายบุคคล**

สามารถแสดงรูป Avatar แบบ Modal Popup (โดยไม่ต้องเปลี่ยนหน้า)

[![07-user-profile-modal.png](https://i.postimg.cc/Y0dPXzTx/07-user-profile-modal.png)](https://postimg.cc/RJnGhKS3)

## **8.6 ระบบ Authentication & Authorization**

หน้า Login สำหรับยืนยันตัวตนเข้าสู่ระบบ รองรับการจัดการ Session, Middleware ป้องกัน admin route และ Hash Password ด้วย bcrypt

[![08-login.png](https://i.postimg.cc/wM4N412N/08-login.png)](https://postimg.cc/hQxhfPH4)

## **8.7 ระบบ CRUD ผู้ใช้งาน (Users Management)**

•	รายการผู้ใช้งาน (Manage Users) รองรับการเพิ่ม (Create), อ่าน (Read), แก้ไข (Update), และลบ (Delete) ผู้ใช้งาน

[![09-ciud.png](https://i.postimg.cc/L6hLYV43/09-ciud.png)](https://postimg.cc/SJFJHCMn)

•	ฟอร์มเพิ่ม / แก้ไขผู้ใช้งาน (New / Edit User) แสดงฟอร์มเพื่อสร้างหรือแก้ไขข้อมูลผู้ใช้งาน พร้อมตรวจสอบค่าที่กรอก

[![11-user-edit.png](https://i.postimg.cc/DzY8K9LV/11-user-edit.png)](https://postimg.cc/Z9pT8Dwj)

## **8.8 Dashboard & Statistics**

หน้า Dashboard แสดงสถิติข้อมูลผู้ใช้งานในรูปแบบการ์ด และกราฟ (Charts)

•	การ์ดสรุปจำนวนผู้ใช้งานทั้งหมด
•	กราฟแสดงข้อมูลผู้ใช้งานแบ่งตามสถานะ
•	กราฟแสดงข้อมูลผู้ใช้งานแบ่งตามช่วงอายุ

[![07-dashboard.png](https://i.postimg.cc/j2SNhHHK/07-dashboard.png)](https://postimg.cc/47jmfh2F)

# **9. สรุปผลและแนวทางพัฒนาต่อ**

## **สรุปผล:** 

โครงงาน Thunderbolts Directory เป็นตัวอย่างของการพัฒนาเว็บแอปพลิเคชันแบบ Full-stack โดยใช้ Next.js (App Router) เชื่อมต่อกับฐานข้อมูลจริง (SQLite) ซึ่งรองรับการจัดการข้อมูลผู้ใช้งานแบบครบวงจร (CRUD) พร้อมระบบ Authentication และ Authorization ที่ปลอดภัย และมีหน้า Dashboard แสดงสถิติข้อมูลแบบกราฟและการ์ดอย่างชัดเจน
	
ตัวโค้ดมีการออกแบบ Route Group ที่เป็นระเบียบ และรองรับมาตรฐาน RESTful API เพื่อให้สามารถพัฒนาต่อยอดได้ง่าย

## **แนวทางพัฒนาต่อ:**

•	รองรับระบบค้นหา (Search)
•	เพิ่มระบบ Pagination / Lazy Loading ในหน้า Users
•	เพิ่มระบบ Forgot Password
•	รองรับฐานข้อมูลอื่น ๆ เช่น PostgreSQL หรือ MongoDB
•	เพิ่มระบบอัปโหลดภาพ Profile แบบ Drag & Drop
•	ปรับปรุงให้รองรับ Mobile Responsive ได้สมบูรณ์ยิ่งขึ้น

# **10. รายการสิ่งที่ส่ง (Submission Checklist)**

| ลำดับ | รายการ | สถานะ | หมายเหตุ |
| :---: | ----- | :---: | ----- |
| 1. | เอกสารโครงงาน  จัดทำเป็นไฟล์ word และ pdf | ✅ | we670-final-nextjs-67130893.docx we670-final-nextjs-67130893.pdf |
|  | 1.1 ชื่อระบบงาน, ผู้จัดทำ | ✅ | เอกสารโครงงาน หน้า 1 |
|  | 1.2 รายละเอียด  และ วัตถุประสงค์การใช้งาน | ✅ | เอกสารโครงงาน หน้า 2-4 |
|  | 1.3 โครงสร้างฐานข้อมูล ER Diagram | ✅ | เอกสารโครงงาน หน้า 8-9 |
|  | 1.4 ผลลัพธ์ของการพัฒนา (หน้าจอ, คำอธิบายรายละเอียดการใช้งานบนหน้าเว็บ) | ✅ | เอกสารโครงงาน หน้า 10-18 |
| 2. | นำไฟล์ขึ้น Github สร้าง repository แบบ public แล้วส่ง URL | ✅ | [https://github.com/maetace/we670-final-nextjs-fullstack](https://github.com/maetace/we670-final-nextjs-fullstack)  |
| 3. | สไลด์พรีเซนเตชัน  (พรีเซนต์ไม่เกิน 5 นาที) | ✅ | we670-final-nextjs-67130893.pptx |