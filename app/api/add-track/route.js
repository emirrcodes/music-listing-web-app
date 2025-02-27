import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chinook',
    password: 'tengo_project',
    port: 5432,
});

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received data:', body);  // Debug için log
        
        const { artist, album, trackName, duration, price, isNewArtist, isNewAlbum } = body;
        
        let artistId, albumId;

        // Artist ekleme veya seçme
        if (isNewArtist) {
            try {
                const artistResult = await pool.query(
                    'INSERT INTO artist (name) VALUES ($1) RETURNING artist_id',
                    [artist]
                );
                artistId = artistResult.rows[0].artist_id;
            } catch (error) {
                console.error('Error creating artist:', error);
                return new Response(JSON.stringify({
                    error: 'Failed to create artist',
                    details: error.message
                }), { status: 500 });
            }
        } else {
            artistId = parseInt(artist);
        }
        
        if (isNewAlbum || isNewArtist) {
            try {
                const albumResult = await pool.query(
                    'INSERT INTO album (title, artist_id) VALUES ($1, $2) RETURNING album_id',
                    [album, artistId]
                );
                albumId = albumResult.rows[0].album_id;
            } catch (error) {
                console.error('Error creating album:', error);
                return new Response(JSON.stringify({
                    error: 'Failed to create album',
                    details: error.message
                }), { status: 500 });
            }
        } else {
            albumId = parseInt(album);
        }

        // Track ekleme
        try {
            const durationMs = Math.round(parseFloat(duration) * 1000);
            const trackResult = await pool.query(
                'INSERT INTO track (name, album_id, milliseconds, unit_price, media_type_id) VALUES ($1, $2, $3, $4, 1) RETURNING track_id',
                [trackName, albumId, durationMs, parseFloat(price)]
            );
            const trackId = trackResult.rows[0].track_id;
            console.log('Created new track with ID:', trackId);  // Debug için log

            return new Response(JSON.stringify({
                success: true,
                trackId: trackId
            }), { status: 200 });
        } catch (error) {
            console.error('Error creating track:', error);
            return new Response(JSON.stringify({ 
                error: `Error creating track: ${error.message}` 
            }), { status: 500 });
        }
    } catch (error) {
        console.error('General error:', error);
        return new Response(JSON.stringify({ 
            error: `General error: ${error.message}` 
        }), { status: 500 });
    }
}