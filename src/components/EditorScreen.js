import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import '../App.css'

let socket = null;

const EditorScreen = () => {

  const [content, setContent] = useState('');
  const [students, setStudents ] = useState(0);
  const { codeBlockName } = useParams()
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => { 

        socket = io('http://localhost:5000');
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

      //   socket.on('someonejoined', (userId, numStudentsInTheRoom) => {
      //     console.log(`${userId} join the room`);
      //     console.log(`num of students in the room: ${numStudentsInTheRoom}`);
      //     setStudents(numStudentsInTheRoom);
      //     console.log(`students value after updating: ${students}`);
      // });

      //   socket.on('someoneDisconnected', (userId) => {
      //     console.log(`${userId} leave the room`);
      // });

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
    if (role !== 'mentor') {
      setContent(updatedContent);
      console.log('Sending updated content to server:', updatedContent);
      socket.emit('edit', updatedContent);
    }
  };

  return (
      <div className="editor-block"> 
      <Editor 
        value={content} 
        onChange={handleEdit} 
        theme="vs-dark" 
        defaultLanguage="javascript" 
        options={{ readOnly: role === 'mentor' }}
      />;
      <h3>Number of students in the room: {students}</h3>
      <h3>You are connected as: {role}</h3>
      <Link to="/">Go to Home Page</Link>
      </div>
    );
  }

export default EditorScreen;