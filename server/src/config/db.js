import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER ? process.env.DB_PASS : 'root',
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    acquireTimeout: 30000,
})

export default db.promise();