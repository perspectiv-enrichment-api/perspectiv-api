import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.APP_PORT || 3000,
    DATABASE_HOST: process.env.DB_HOST || 'localhost',
    DATABASE_USER: process.env.DB_USER || '',
    DATABASE_PWD: process.env.DB_PASSWORD,
    DATABASE_SCHEMA: process.env.DB_SCHEMA_NAME,
    DATABASE_PORT: process.env.DB_PORT || '',
    LOGO_CDN: process.env.LOGO_CDN || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
};