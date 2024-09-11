import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorScreen from './components/EditorScreen';
import HomePage from './components/HomePage';
import useResizeObserverErrorHandler from './useResizeObserverErrorHandler';

function App() {

  useResizeObserverErrorHandler();

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor/:codeBlockName" element={<EditorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
