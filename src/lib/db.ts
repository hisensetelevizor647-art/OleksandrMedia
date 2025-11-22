import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
    connectionString: POSTGRES_URL
});

export const db = {
    query: async (text: string, params?: any[]) => {
        const start = Date.now();
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: result.rowCount });
        return result;
    }
};

export default db;
