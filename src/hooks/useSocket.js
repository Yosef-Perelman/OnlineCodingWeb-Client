import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const useSocket = (codeBlockName) => {
  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState('');
  const [students, setStudents] = useState(0);
  const [role, setRole] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(newSocket);

    newSocket.emit('join', codeBlockName);

    newSocket.on('roomInfo', ({ roomSize, isMentor }) => {
      setStudents(roomSize);
      setRole(isMentor ? 'mentor' : 'user');
      setIsLoading(false);
    });

    newSocket.on('userJoined', ({ roomSize }) => setStudents(roomSize));
    newSocket.on('userLeft', ({ roomSize }) => setStudents(roomSize));
    newSocket.on('updateContent', (updatedContent) => setContent(updatedContent));
    newSocket.on('correctSolution', () => setIsSolved(true));

    // Add handler for mentorLeft event
    newSocket.on('mentorLeft', () => {
      navigate('/'); // Redirect to home page
    });

    return () => newSocket.disconnect();
  }, [codeBlockName, navigate]);

  const handleEdit = (updatedContent) => {
    if (role !== 'mentor' && !isSolved) {
      setContent(updatedContent);
      socket.emit('edit', updatedContent, codeBlockName);
    }
  };

  return { socket, content, students, role, isSolved, isLoading, handleEdit };
};

export default useSocket;