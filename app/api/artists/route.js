import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',         
    host: 'localhost',        
    database: 'chinook',      
    password: 'tengo_project',
    port: 5432,               
});

export async function GET(req) {
    try {
        const result = await pool.query('SELECT artist_id, name FROM artist');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response('Error querying database', { status: 500 });
    }
}