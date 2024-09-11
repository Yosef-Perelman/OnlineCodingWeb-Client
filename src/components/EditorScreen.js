import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import '../App.css'
import './EditorScreen.css';

let socket = null;

const EditorScreen = () => {

  const [content, setContent] = useState('');
  const [students, setStudents ] = useState(0);
  const { codeBlockName } = useParams()
  const [role, setRole] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 

        socket = io(process.env.REACT_APP_SOCKET_URL);
        console.log('Connecting to server');

        socket.emit('join', codeBlockName);

        socket.on('roomInfo', ({ roomSize, isMentor }) => {
          console.log(`Room info received. Users in room: ${roomSize}`);
          setStudents(roomSize);
          setRole(isMentor ? 'mentor' : 'user');
        });

        socket.on('userJoined', ({ socketId, roomSize }) => {
          console.log(`${socketId} joined the room. Total users: ${roomSize}`);
          setStudents(roomSize);
        });

        socket.on('userLeft', ({ socketId, roomSize }) => {
          console.log(`${socketId} left the room. Total users: ${roomSize}`);
          setStudents(roomSize);
        });

        socket.on('updateContent', (updatedContent) => {
            console.log('Received content from server:', updatedContent);
            setContent(updatedContent);
        });

         // Handle the correct solution event
         socket.on('correctSolution', () => {
          setIsSolved(true);  // Mark as solved
      });

      socket.on('mentorLeft', () => {
        console.log('Mentor left the room. Redirecting to home page.');
        socket.disconnect();
        navigate('/');
      });

        return () => {
          console.log('inside the client return')
          socket.off('updateContent');
          socket.disconnect();
      };
  },[codeBlockName, navigate]);

  const handleEdit = (updatedContent) => { 
    if (role !== 'mentor' && !isSolved) {
      setContent(updatedContent);
      console.log('Sending updated content to server:', updatedContent);
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
              <p>Good day Tom!</p>
            </>
          ) : (
            <>
              <p>You are connected as <span className="highlight student">student</span></p>
              <p>Complete the missing words wherever an underscore appears so that the code is correct</p>
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