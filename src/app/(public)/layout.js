// src/app/(public)/layout.js

import MainHeader from '@/components/main-header';

export default function ContentLayout({ children }) {
    return (
        <>
            <MainHeader />
            {children}
        </>
    );
}