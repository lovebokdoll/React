import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <React.Fragment>
      <Navbar fixed="bottom" class="navbar navbar-expand-sm bg-light justify-content-center" bg="dark" style={{ color: 'white' }}>
        자바캠프 Copyright&copy;2023
      </Navbar>
    </React.Fragment>
  );
};

export default Footer;
