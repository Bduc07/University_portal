import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';           // Updated here
import reportWebVitals from './reportWebVitals.js';  // Fixed previously

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(console.log);  