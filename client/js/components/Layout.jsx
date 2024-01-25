import React from 'react';

import {Outlet} from 'react-router-dom';
import Header from './header/Header';
import Container from 'react-bootstrap/Container';

const Layout = () => {
  return (
    <div>
      <Header/>
      <Container>
        <Outlet/>
      </Container>
    </div>
  );
};

export default Layout;
