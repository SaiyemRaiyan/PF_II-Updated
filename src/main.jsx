import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource/jetbrains-mono/400.css';
import './styles/global.css';
import './styles/upgrade.css'; // v3 design layer (loads after global.css)
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
