import { GRFPool } from "../db";
import { Credientials } from "../types/auth";

export default class AuthService {

    static async login(credentials: Credientials) {
        const { username, password } = credentials;
        const pool = await GRFPool();

        try {
            const result = await pool.request()
                .input('username', username)
                .input('password', password)
                .query(`
                    SELECT * FROM PROD.auth
                    WHERE username = @username AND password = @password
                `);
            if (result.recordset.length === 0) {
                return { success: false, message: 'Invalid credentials' };
            }

            const user = result.recordset[0];
            console.log('User logged in:', user);
            return { success: true, user };
        } catch (err) {
            console.error('Login error:', err);
            throw new Error('Login failed');
        }
    }

    static async register(credentials: Credientials) {
        const { username, password } = credentials;
        const pool = await GRFPool();

        try {
            const existingUser = await pool.request()
                .input('username', username)
                .query('SELECT * FROM PROD.auth WHERE username = @username');

            if (existingUser.recordset.length > 0) {
                return { success: false, message: 'Username already exists' };
            }

            await pool.request()
                .input('username', username)
                .input('password', password)
                .query('INSERT INTO PROD.auth (username, password) VALUES (@username, @password)');

            console.log('User registered:', username);
            return { success: true, message: 'User registered successfully' };
        } catch (err) {
            console.error('Registration error:', err);
            throw new Error('Registration failed');
        }
    }
    
}