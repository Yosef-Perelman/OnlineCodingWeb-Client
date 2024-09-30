import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css';

const Info = ({ codeBlockName, role, isSolved, studentCount }) => (
  <div className="info-section">
    <h1>{codeBlockName}</h1>
    {role === 'mentor' ? (
      <p>You are connected as <span className="highlight mentor">mentor</span></p>
    ) : (
      <>
        <p>You are connected as <span className="highlight student">student</span></p>
        <p>Complete the missing keywords to make the code work!</p>
      </>
    )}
    {isSolved && (
      <>
        <p>That's right! Well done!</p>
        <div className="smiley">😊</div>
      </>
    )}
    <p className="student-count">Number of students: {studentCount}</p>
    <Link to="/" className="home-link">Go to Home Page</Link>
  </div>
);

export default Info;