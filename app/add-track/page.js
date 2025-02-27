'use client';

import { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';

export default function AddTrack() {
    const [isNewArtist, setIsNewArtist] = useState(false);
    const [isNewAlbum, setIsNewAlbum] = useState(false);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [newArtistName, setNewArtistName] = useState('');
    const [newAlbumName, setNewAlbumName] = useState('');
    const [trackName, setTrackName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetch('/api/artists')
            .then((res) => res.json())
            .then((data) => setArtists(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedArtist && !isNewArtist) {
            fetch(`/api/artists/${selectedArtist}/albums`)
                .then((res) => res.json())
                .then((data) => setAlbums(data))
                .catch((err) => console.error(err));
        }
    }, [selectedArtist, isNewArtist]);

    useEffect(() => {
        if (isNewArtist) {
            setIsNewAlbum(true);
            setSelectedAlbum('');
            setAlbums([]);
        } else {
            setIsNewAlbum(false);
        }
    }, [isNewArtist]);

    const handleSubmit = async () => {
        try {
            if (!trackName.trim()) {
                alert('Track name is required');
                return;
            }

            if (!duration.trim()) {
                alert('Duration is required');
                return;
            }

            if (!price.trim()) {
                alert('Price is required');
                return;
            }

            let durationInMs;
            if (duration.includes(':')) {
                const [minutes, seconds] = duration.split(':').map(Number);
                durationInMs = ((minutes * 60) + seconds) * 1000;
            } else {
                durationInMs = parseFloat(duration) * 60 * 1000;
            }

            const newTrackData = {
                artist: isNewArtist ? newArtistName : selectedArtist,
                album: isNewAlbum ? newAlbumName : selectedAlbum,
                trackName: trackName.trim(),
                duration: durationInMs,
                price: parseFloat(price),
                isNewArtist,
                isNewAlbum,
            };

            console.log('Sending track data:', newTrackData);

            const response = await fetch('/api/add-track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrackData),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create track');
            }

            alert('Track added successfully!');
            
            setTrackName('');
            setDuration('');
            setPrice('');
            setSelectedArtist('');
            setSelectedAlbum('');
            setNewArtistName('');
            setNewAlbumName('');
            setIsNewArtist(false);
            setIsNewAlbum(false);

        } catch (error) {
            console.error('Error adding track:', error);
            alert(`Failed to add track: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#6ba292', minHeight: '100vh', color: 'white' }}>
            <HomeButton />
            <h1 style={{ textAlign: 'center' }}>Add New Track</h1>
            <div style={{ backgroundColor: 'white', color: 'black', borderRadius: '8px', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <label>
                    <input type="checkbox" checked={isNewArtist} onChange={(e) => setIsNewArtist(e.target.checked)} />
                    Is it a new artist?
                </label>
                <br />
                {isNewArtist ? (
                    <input
                        type="text"
                        placeholder="New Artist Name"
                        value={newArtistName}
                        onChange={(e) => setNewArtistName(e.target.value)}
                        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                    />
                ) : (
                    <select
                        value={selectedArtist}
                        onChange={(e) => setSelectedArtist(e.target.value)}
                        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                    >
                        <option value="">Select an artist</option>
                        {artists.map((artist) => (
                            <option key={artist.artist_id} value={artist.artist_id}>
                                {artist.name}
                            </option>
                        ))}
                    </select>
                )}

                <label>
                    <input
                        type="checkbox"
                        checked={isNewAlbum}
                        onChange={(e) => setIsNewAlbum(e.target.checked)}
                        disabled={isNewArtist}
                    />
                    Is it a new album?
                </label>
                <br />
                {isNewAlbum || isNewArtist ? (
                    <input
                        type="text"
                        placeholder="New Album Name"
                        value={newAlbumName}
                        onChange={(e) => setNewAlbumName(e.target.value)}
                        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                    />
                ) : (
                    <select
                        value={selectedAlbum}
                        onChange={(e) => setSelectedAlbum(e.target.value)}
                        disabled={isNewArtist}
                        style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                    >
                        <option value="">Select an album</option>
                        {albums.map((album) => (
                            <option key={album.album_id} value={album.album_id}>
                                {album.title}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    type="text"
                    placeholder="Track Name"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                />
                <input
                    type="text"
                    placeholder="Duration (e.g., 3.45)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
                />
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '10px 20px',
                        marginTop: '20px',
                        backgroundColor: '#6ba292',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                    }}
                >
                    Add Track
                </button>
            </div>
        </div>
    );
}