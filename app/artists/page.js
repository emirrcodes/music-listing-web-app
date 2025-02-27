'use client';

import { useEffect, useState } from 'react';
import HomeButton from '../components/HomeButton'; // HomeButton bileşeni

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('/api/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#6ba292', color: 'white', minHeight: '100vh', position: 'relative' }}>
      <HomeButton />
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Artists</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {artists.map((artist) => (
          <li key={artist.artist_id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <a href={`/artists/${artist.artist_id}`} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
              {artist.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}