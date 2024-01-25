import React from 'react';

import {Outlet} from 'react-router-dom';
import Header from './header/Header';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Layout = () => {
  return (
    <div>
      <Header/>
      <Container>
        <Card className="mt-2" body>
          <Outlet/>
        </Card>
      </Container>
    </div>
  );
};

export default Layout;
