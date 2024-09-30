import React from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import InfoSection from '../components/Info';
import LoadingIndicator from '../components/Loading';
import useSocket from '../hooks/useSocket';
import './EditorPage.css';

const EditorPage = () => {
  const { codeBlockName } = useParams();
  //const navigate = useNavigate();
  const { content, students, role, isSolved, isLoading, handleEdit } = useSocket(codeBlockName);

  if (isLoading) {
    return (
      <div className="editor-page">
        <div className="content-wrapper editor-wrapper">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  return (
    <div className="editor-page">
      <div className="content-wrapper editor-wrapper">
        <InfoSection
          codeBlockName={codeBlockName}
          role={role}
          isSolved={isSolved}
          studentCount={students - 1}
        />
        <div className="editor-section">
          <Editor
            content={content}
            onChange={handleEdit}
            readOnly={role === 'mentor' || isSolved}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;