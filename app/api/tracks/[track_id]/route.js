import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chinook',
    password: 'tengo_project',
    port: 5432,
});

export async function GET(req, { params }) {
  const { track_id } = params;

  try {
    const result = await pool.query(
      `SELECT t.name AS track_name, a.title AS album_name, ar.name AS artist_name, t.milliseconds, t.unit_price
       FROM track t
       JOIN album a ON t.album_id = a.album_id
       JOIN artist ar ON a.artist_id = ar.artist_id
       WHERE t.track_id = $1`,
      [track_id]
    );
    if (result.rows.length === 0) {
      return new Response('Track not found', { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new Response('Error querying database', { status: 500 });
  }
}

// Yeni DELETE metodu
export async function DELETE(req, {params}){
  const {track_id} = params;
  console.log('Track id to delete: ', track_id);

  try{
    const result = await pool.query(
      `DELETE FROM track WHERE track_id = $1 RETURNING *`,
      [track_id]
    );

    if(result.rowCount === 0){
      console.log('Track not found');
      return new Response('Track not found', { status : 404 });
    }
    
    console.log('Track deleted:', result.rows[0]);
    return new Response(JSON.stringify({ message: 'Track deleted successfully' }), { status: 200 });

  }catch (error){
    console.error('Error deleting track:', error);
    return new Response('Error deleting track', {status : 500});
  }
}