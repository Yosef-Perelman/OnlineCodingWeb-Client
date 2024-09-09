import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="text-3xl font-bold mb-6">Choose Code Block</h1>
      <div className="link-grid">
        <Link to="/editor/basic-example" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-bold">Basic Example</h3>
          <p className="text-gray-600">Open the basic code editor</p>
        </Link>
        <Link to="/editor/advanced-example" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-bold">Advanced Example</h3>
          <p className="text-gray-600">Open the advanced code editor</p>
        </Link>
        <Link to="/editor/tutorial-code" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-bold">Tutorial Code</h3>
          <p className="text-gray-600">Open the tutorial code editor</p>
        </Link>
        <Link to="/editor/sample-project" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-bold">Sample Project</h3>
          <p className="text-gray-600">Open the sample project editor</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
