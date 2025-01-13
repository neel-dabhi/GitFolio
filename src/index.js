import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GithubProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
