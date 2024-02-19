import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HorizontalGroup = ({children}) => {
  return (
    <Row>
      {children.map((child, idx) => (
        <Col sm key={idx}>
          {child}
        </Col>
      ))}
    </Row>
  );
};


HorizontalGroup.propTypes = {
  children: PropTypes.array
};


export default HorizontalGroup;
