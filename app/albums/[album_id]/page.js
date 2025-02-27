'use client';

import { useEffect, useState } from 'react';
import HomeButton from '../../components/HomeButton'; // HomeButton bileşeni

export default function AlbumDetails({ params }) {
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const { album_id } = await params;
        const response = await fetch(`/api/albums/${album_id}`);
        if (!response.ok) throw new Error('Failed to fetch album data');
        const data = await response.json();
        setAlbum(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchAlbum();
  }, [params]);

  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#6ba292', color: 'black', minHeight: '100vh', position: 'relative' }}>
      <HomeButton />
      <div style={{ marginTop: '50px' }}> {/* Albüm detaylarını biraz aşağı çekiyoruz */}
        <h1>{album.title}</h1>
        <p><strong>Artist:</strong> {album.artist_name}</p>
        <h3>Tracks:</h3>
        <ul>
          {album.tracks.map((track) => (
            <li key={track.track_id}>
              <p><strong>{track.track_name}</strong></p>
              <p>
                Duration: {Math.floor(track.milliseconds / 60000)} minutes
                {track.milliseconds % 60000 > 0
                  ? ` ${Math.round((track.milliseconds % 60000) / 1000)} seconds`
                  : ''}
              </p>
              <p>Price: ${track.unit_price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}