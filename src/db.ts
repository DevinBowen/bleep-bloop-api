import 'dotenv/config'
import sql from 'mssql'

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}

let pool: sql.ConnectionPool | null = null;

export const GRFPool = async (): Promise<sql.ConnectionPool> => {
    if (pool) return pool;

    try {
        pool = await new sql.ConnectionPool(config).connect();
        console.log('Connected to MSSQL');
        return pool;
    } catch (err) {
        console.error('Database Connection Failed! Bad Config:', err);
        throw err;
    }
};