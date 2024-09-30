import React, { useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Editor.css';

const Editor = React.memo(({ content, onChange, readOnly }) => {
  const handleEditorChange = useCallback((value) => {
    onChange(value);
  }, [onChange]);

  return (
    <MonacoEditor
      value={content}
      onChange={handleEditorChange}
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{ readOnly }}
    />
  );
});

export default Editor;