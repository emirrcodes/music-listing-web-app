import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chinook',
    password: 'tengo_project',
    port: 5432,
});

export async function GET(req, { params }) {
    const { artist_id } = params;

    try {
        // Artist'in albümlerini çek
        const result = await pool.query(
            'SELECT album_id, title FROM album WHERE artist_id = $1',
            [artist_id]
        );

        if (result.rows.length === 0) {
            return new Response('No albums found', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch albums', { status: 500 });
    }
}