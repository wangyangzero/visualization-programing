import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './platform/layout';
import Design from './platform/design';
import { isDev } from './common';
import reportWebVitals from './reportWebVitals';

// 开发环境使用平台预览CSS，生产环境使用成品CSS
isDev() ? require('./index.dev.css') : require('./index.pro.css');

if(isDev()) {
  ReactDOM.render(
      <Layout />,
    document.getElementById('layout')
  );
  ReactDOM.render(
      <Design />,
    document.getElementById('design')
  );
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
