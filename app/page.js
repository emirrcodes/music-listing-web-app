'use client';

import Link from 'next/link';
import styles from './styles/page.module.css';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0a3027', height: '100vh', color: 'white' }}>
      <img
        src="/images/image.jpg" // Public klasörü içindeki bir görsel
        alt="Platform Logo"
        style={{ marginTop: '20px', borderRadius: '50%' }} // Inline CSS
        />
      <h1 style={{ margin: '20px', fontSize: '24px' }}>Welcome to Your Music Platform 🎵🎤</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '300px' }}>
        <Link href="/albums">
          <button className={styles.button_style}>Albums</button>
        </Link>
        <Link href="/tracks">
          <button className={styles.button_style}>Tracks</button>
        </Link>
        <Link href="/artists">
          <button className={styles.button_style}>Artists</button>
        </Link>
      </div>
    </div>
  );
}
