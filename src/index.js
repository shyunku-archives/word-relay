import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import PageRouter from './PageRouter';
import {Helmet} from 'react-helmet';

import './init.scss';
import './index.scss';

ReactDOM.render(
  <>
    <Helmet>
      <title>끝말이끼</title>
    </Helmet>
    <PageRouter/>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
