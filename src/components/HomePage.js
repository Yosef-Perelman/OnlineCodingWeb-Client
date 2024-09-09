import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Choose Code Block</h1>
      <div className="link-grid">
        <Link to="/editor/name" >
          <h3>Basic Example</h3>
          <p>Open the basic code editor</p>
        </Link>
        <Link to="/editor/name">
          <h3>Advanced Example</h3>
          <p>Open the advanced code editor</p>
        </Link>
        <Link to="/editor/name">
          <h3>Tutorial Code</h3>
          <p>Open the tutorial code editor</p>
        </Link>
        <Link to="/editor/name">
          <h3>Sample Project</h3>
          <p>Open the sample project editor</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
