'use client';

import { useEffect, useState } from 'react';
import HomeButton from '../components/HomeButton'; // HomeButton bileşeni

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('/api/albums')
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#6ba292', color: 'white', minHeight: '100vh', position: 'relative' }}>
      <HomeButton />
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>All Albums</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {albums.map((album) => (
          <li key={album.album_id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <a href={`/albums/${album.album_id}`} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
              {album.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}