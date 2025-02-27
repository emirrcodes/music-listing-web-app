'use client';

import { useEffect, useState } from 'react';
import HomeButton from '../components/HomeButton';
import Link from 'next/link';

export default function Tracks() {
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [maxDuration, setMaxDuration] = useState('');

    // Fetch tracks
    useEffect(() => {
        fetch('/api/tracks')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched tracks:', data); // Gelen veriyi kontrol etmek için
                setTracks(data);
                setFilteredTracks(data);
            })
            .catch((err) => console.error('Failed to fetch tracks:', err));
    }, []);

    // Handle filter
    const handleFilter = () => {
        const minPriceNum = parseFloat(minPrice) || 0;
        const maxPriceNum = parseFloat(maxPrice) || Infinity;
        const minDurationMs = (parseFloat(minDuration) || 0) * 60000;
        const maxDurationMs = (parseFloat(maxDuration) || Infinity) * 60000;

        const filtered = tracks.filter((track) => {
            const trackPrice = parseFloat(track.unit_price);
            const trackDuration = parseInt(track.milliseconds);
            return (
                trackPrice >= minPriceNum &&
                trackPrice <= maxPriceNum &&
                trackDuration >= minDurationMs &&
                trackDuration <= maxDurationMs
            );
        });

        setFilteredTracks(filtered);
    };

    // Handle Enter key press for filter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: '#6ba292',
                minHeight: '100vh',
                position: 'relative',
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <HomeButton />
            <Link href="/add-track">
                <button
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Add New Track
                </button>
            </Link>
            <h1 style={{ color: 'white', textAlign: 'center' }}>All Tracks</h1>
            <div style={{ marginBottom: '20px', marginTop: '60px' }}>
                {/* Filtering Form */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <input
                        type="text"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Min Duration (min)"
                        value={minDuration}
                        onChange={(e) => setMinDuration(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Max Duration (min)"
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button
                        onClick={handleFilter}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#6ba292',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Filter
                    </button>
                </div>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredTracks.map((track) => (
                    <li
                        key={track.track_id}
                        style={{
                            margin: '10px 0',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Link href={`/tracks/${track.track_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>{track.track_name}</span>
                        </Link>
                        <span>
                            {Math.floor(track.milliseconds / 60000)}:
                            {Math.round((track.milliseconds % 60000) / 1000)
                                .toString()
                                .padStart(2, '0')} | ${track.unit_price}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}