import React from 'react';
import {createRoot} from 'react-dom/client';

import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes/>
  </HashRouter>
);
