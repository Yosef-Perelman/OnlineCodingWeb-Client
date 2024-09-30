import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

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
    newSocket.on('updateContent', (updatedContent) => {
      setContent(updatedContent);
    });
    newSocket.on('correctSolution', () => setIsSolved(true));

    newSocket.on('mentorLeft', () => {
      navigate('/');
    });

    return () => newSocket.disconnect();
  }, [codeBlockName, navigate]);

  const debouncedEmit = useCallback(
    debounce((updatedContent, room) => {
      socket.emit('edit', updatedContent, room);
    }, 300),
    [socket]
  );

  const handleEdit = useCallback((updatedContent) => {
    if (role !== 'mentor' && !isSolved) {
      setContent(updatedContent);
      debouncedEmit(updatedContent, codeBlockName);
    }
  }, [role, isSolved, codeBlockName, debouncedEmit]);

  return { socket, content, students, role, isSolved, isLoading, handleEdit };
};

export default useSocket;