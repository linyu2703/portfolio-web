import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import your main portfolio component

// This is the standard entry point for a modern React application using Vite.
// It finds the HTML element with id="root" and renders the App component inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);