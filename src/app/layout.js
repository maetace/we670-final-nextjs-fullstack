import '../styles/globals.css';

/**
 * Root layout สำหรับโครงสร้าง HTML หลักของแอป
 */
export const metadata = {
  title: 'Thunderbolts* Directory',
  description: 'พัฒนาด้วย Next.js Full-stack รองรับการจัดการข้อมูลสมาชิก',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head />
      <body>{children}</body>
    </html>
  );
}