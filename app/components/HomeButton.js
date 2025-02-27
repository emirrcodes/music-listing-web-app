import Link from 'next/link';

export default function HomeButton() {
  return (
    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
      <Link href="/">
        <button 
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #6ba292',
            borderRadius: '8px',
            color: '#6ba292',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Home
        </button>
      </Link>
    </div>
  );
}