import React from 'react';
import ReactDOM from 'react-dom';
import 'modern-css-reset';
import 'sakura.css/css/sakura-dark-solarized.css';

import App from './sampleApp/pages/App';
// import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
