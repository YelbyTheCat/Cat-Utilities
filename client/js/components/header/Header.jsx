import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const pages = ['Jobs', 'Money'];

import logo from '../../../img/TBS - EditedF.png';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="" width="30" height="30" className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link as={NavLink} eventKey="" to="/">Home</Nav.Link>
          <Nav className="me-auto">
            {pages.map(page => (
              <Nav.Link as={NavLink} eventKey="" to={page.toLowerCase()} key={page}>{page}</Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


Header.propTypes = {

};


export default Header;
