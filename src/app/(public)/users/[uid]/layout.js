// src/app/(content)/users/[uid]/layout.js

export default function UserLayout({ children, modal }) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}