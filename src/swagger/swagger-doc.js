// src/swagger/swagger-doc.js

import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinition } from './swagger-config.js';

const options = {
    swaggerDefinition,
    apis: ['./src/app/api/**/*.js'], // สแกนคอมเมนต์ในไฟล์ API
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;