// src/app/docs/page.js

'use client';

import { useEffect } from 'react';
import 'swagger-ui-dist/swagger-ui.css';

export default function SwaggerDocsPage() {
    useEffect(() => {
        import('swagger-ui-dist/swagger-ui-es-bundle').then(({ default: SwaggerUI }) => {
            SwaggerUI({
                dom_id: '#swagger-ui',
                url: '/api/swagger',
            });
        });
    }, []);

    return (
        <main style={{ padding: '0', background: '#EAEAEA', color: '#000' }}>
            <div id="swagger-ui" />
            <style jsx global>{`
                body {
                    background-color: #EAEAEA !important;
                    color: #000 !important;
                }
                .swagger-ui {
                    background-color: #EAEAEA;
                }
            `}</style>
        </main>
    );
}