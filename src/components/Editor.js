import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Editor.css';

const Editor = ({ content, onChange, readOnly }) => (
  <MonacoEditor
    value={content}
    onChange={onChange}
    theme="vs-dark"
    defaultLanguage="javascript"
    options={{ readOnly }}
  />
);

export default Editor;