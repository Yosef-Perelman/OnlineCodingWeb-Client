import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const rooms = [
  { id: 1, name: 'Basic Example' },
  { id: 2, name: 'Advanced Example' },
  { id: 3, name: 'Tutorial Code' },
  { id: 4, name: 'Sample Project' },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content-wrapper">
        <h1 className="title">Learn JS with Tom!</h1>
        <h2 className="subtitle">Choose Code Block</h2>
        <div className="room-grid">
          {rooms.map((room) => (
            <Link key={room.id} to={`/editor/room${room.id}`} className="room-link">
              <h3>{room.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;