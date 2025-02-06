require('dotenv').config();
const JWT_ADMIN_SECURE = process.env.ADMIN_SECRET_KEY;
const JWT_USER_SECURE = process.env.USER_SECRET_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
module.exports = { JWT_ADMIN_SECURE, JWT_USER_SECURE, DATABASE_URL }