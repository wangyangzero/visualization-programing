import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { isDev } from './common';
import reportWebVitals from './reportWebVitals';

// 开发环境使用平台预览CSS，生产环境使用成品CSS
console.log(isDev())
isDev() ? require('./index.dev.css') : require('./index.pro.css');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
