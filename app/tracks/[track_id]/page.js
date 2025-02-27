'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HomeButton from '../../components/HomeButton';

const handleDelete = async (trackId) => {
  console.log('Track ID:', trackId);
  const isConfirmed = window.confirm('Are u sure dude ?');

  if(isConfirmed){
    try {
      const response = await fetch(`/api/tracks/${trackId}`, {
        method : 'DELETE',
        headers:{
        'Content-Type' : 'application/json', 
        },
      });

      if(!response.ok){
        throw new Error('Failed to delete track');
      }

      const data = await response.json();
      console.log('Track deleted succesfuly', data);
      alert("Track deleted succesfuly");
    } catch (error){
      console.error('error deleting track:', error);
      alert('An error occured while deleting the track');
    }
  }
}

export default function TrackDetails() {
  const [track, setTrack] = useState(null);
  const params = useParams();
  const track_id = params.track_id;

  useEffect(() => {
    fetch(`/api/tracks/${track_id}`)
      .then((res) => res.json())
      .then((data) => setTrack(data))
      .catch((err) => console.error(err));
  }, [track_id]);

  if (!track) {
    return <div>Loading...</div>;
  }
  
  const buttonStyle = {
    top: '50%',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#6ba292', color: 'white', minHeight: '100vh', position: 'relative' }}>
      <HomeButton />
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>{track.track_name}</h1>
      <div style={{ backgroundColor: 'white', color: 'black', borderRadius: '8px', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <p><strong>Album:</strong> {track.album_name}</p>
        <p><strong>Artist:</strong> {track.artist_name}</p>
        <p><strong>Duration:</strong> {Math.floor(track.milliseconds / 60000)} minutes
          {track.milliseconds % 60000 > 0 ? ` ${Math.round((track.milliseconds % 60000) / 1000)} seconds` : ''}
        </p>
        <p><strong>Price:</strong> ${track.unit_price}</p>
        <button style = {buttonStyle} onClick={() => handleDelete(track_id)} >
          Delete
        </button>
      </div>
    </div>
  );
}