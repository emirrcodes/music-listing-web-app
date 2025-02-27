import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',         // PostgreSQL kullanıcı adı
    host: 'localhost',        // PostgreSQL sunucusunun adresi
    database: 'chinook',      // Chinook veritabanı adı
    password: 'tengo_project', // PostgreSQL şifresi
    port: 5432,               // PostgreSQL varsayılan portu
});

export async function GET(req) {
    try {
        const result = await pool.query('SELECT * FROM album');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response('Error querying database', { status: 500 });
    }
}