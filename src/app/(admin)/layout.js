// src/app/(admin)/layout.js

import MainHeader from '@/components/main-header';

export default function ContentLayout({ children }) {
    return (
        <>
            <MainHeader />
            {children}
        </>
    );
}