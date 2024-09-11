import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import './EditorScreen.css';

let socket = null;

const EditorScreen = () => {

  const [content, setContent] = useState(''); // The code
  const [students, setStudents] = useState(0); // Number of students in the room
  const { codeBlockName } = useParams();
  const [role, setRole] = useState(''); // mentor or student
  const [isSolved, setIsSolved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    // Connecting to the server
    console.log('Connecting to the server.')
    socket = io(process.env.REACT_APP_SOCKET_URL);

    socket.emit('join', codeBlockName);

    // Get the current content of the editor and the role
    socket.on('roomInfo', ({ roomSize, isMentor }) => {
      setStudents(roomSize);
      setRole(isMentor ? 'mentor' : 'user');
    });

    // Get the socketId for future use
    socket.on('userJoined', ({ socketId, roomSize }) => { setStudents(roomSize); });

    // Get the socketId for future use
    socket.on('userLeft', ({ socketId, roomSize }) => { setStudents(roomSize); });

    socket.on('updateContent', (updatedContent) => { setContent(updatedContent); });

    socket.on('correctSolution', () => { setIsSolved(true); });

    socket.on('mentorLeft', () => {
      socket.disconnect();
      navigate('/');
    });

    return () => {
      console.log('Disconnecting from the server.')
      socket.disconnect();
    };
  }, [codeBlockName, navigate]);


  const handleEdit = (updatedContent) => {
    if (role !== 'mentor' && !isSolved) {
      setContent(updatedContent);
      socket.emit('edit', updatedContent, codeBlockName);
    }
  };

  return (
    <div className="editor-page">
      <div className="content-wrapper editor-wrapper">
        <div className="info-section">
          <h1>{codeBlockName}</h1>
          {role === 'mentor' ? (
            <>
              <p>You are connected as <span className="highlight mentor">mentor</span></p>
              
            </>
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
          <p className="student-count">Number of students: {students - 1}</p>
          <Link to="/" className="home-link">Go to Home Page</Link>
        </div>

        <div className="editor-section">
          <Editor
            value={content}
            onChange={handleEdit}
            theme="vs-dark"
            defaultLanguage="javascript"
            options={{ readOnly: role === 'mentor' || isSolved }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorScreen;