import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading-indicator">
    <div className="loading-spinner"></div>
    <p>Loading editor...</p>
  </div>
);

export default Loading;