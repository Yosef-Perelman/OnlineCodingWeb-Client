import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import '../App.css'

let socket = null;

const EditorScreen = () => {

  const [content, setContent] = useState('');
  const [students, setStudents ] = useState(0);
  const { codeBlockName } = useParams()

  useEffect(() => { 

        socket = io('http://localhost:5000');
        console.log('Connecting to server');

        socket.emit('join', codeBlockName);

        socket.on('roomInfo', ({ roomSize }) => {
          console.log(`Room info received. Users in room: ${roomSize}`);
          setStudents(roomSize);
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

        return () => {
          console.log('inside the client return')
          socket.off('updateContent');
          socket.disconnect();
      };
  },[codeBlockName]);

  const handleEdit = (updatedContent) => { 
    setContent(updatedContent);
    console.log('Sending updated content to server:', updatedContent);
    socket.emit('edit', updatedContent);
  };

  return (
      <div className="editor-block"> 
      <Editor value={content} onChange={handleEdit} theme="vs-dark" defaultLanguage="javascript"/>;
      <h3>Number of students in the room: {students}</h3>
      </div>
    );
  }

export default EditorScreen;