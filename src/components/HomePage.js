import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { rooms } from '../Config'

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content-wrapper">
        <h1 className="title">Learn JS with Tom!</h1>
        <h2 className="subtitle">Choose Code Block</h2>
        <div className="room-grid">
          {rooms.map((room) => (
            <Link key={room.name} to={`/editor/${room.name}`} className="room-link">
              <h3>{room.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;