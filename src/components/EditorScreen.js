import React, {useState, useEffect} from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import '../App.css'

const socket = io('http://localhost:5000');

const EditorScreen = () => {

  const [content, setContent] = useState('');

  useEffect(() => { socket.on('updateContent', (updatedContent) => {
            console.log('Received content from server:', updatedContent);
            setContent(updatedContent);
        });

        return () => {
          socket.off('updateContent');
      };
  },[]);

  const handleEdit = (updatedContent) => { 
    setContent(updatedContent);
    console.log('Sending updated content to server:', updatedContent);
    socket.emit('edit', updatedContent);
  };

  return (
    <>
      <div className="editor-block"> 
      <Editor value={content} onChange={handleEdit} theme="vs-dark" defaultLanguage="javascript"/>;
      </div>
    </>
    );
  }

export default EditorScreen;