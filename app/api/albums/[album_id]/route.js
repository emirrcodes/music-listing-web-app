import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chinook',
    password: 'tengo_project', // PostgreSQL şifren
    port: 5432,
});

export async function GET(req, { params }) {
    const { album_id } = params;

    try {
        // Albüm ve sanatçı bilgilerini al
        const albumQuery = `
            SELECT album.album_id, album.title, artist.name AS artist_name
            FROM album
            JOIN artist ON album.artist_id = artist.artist_id
            WHERE album.album_id = $1
        `;
        const albumResult = await pool.query(albumQuery, [album_id]);

        if (albumResult.rows.length === 0) {
            return new Response('Album not found', { status: 404 });
        }

        // Şarkıları al
        const tracksQuery = `
            SELECT track_id, name AS track_name, milliseconds, unit_price
            FROM track
            WHERE album_id = $1
        `;
        const tracksResult = await pool.query(tracksQuery, [album_id]);

        // Albüm ve şarkı verilerini birleştir
        const response = {
            ...albumResult.rows[0],
            tracks: tracksResult.rows,
        };

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response('Error querying database', { status: 500 });
    }
}