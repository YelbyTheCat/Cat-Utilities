import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getFormId} from '../../helpers/misc-helper';

const HorizontalGroup = ({children, regSuffix}) => {
  return (
    <Row>
      {React.Children.map(children, (child, index) => (
        <Col sm key={index}>
          {React.cloneElement(child, {...child.props, reg: regSuffix ? `${regSuffix}${getFormId(child)}` : undefined})} 
        </Col>
      ))}
    </Row>
  );
};

HorizontalGroup.propTypes = {
  children: PropTypes.array,
  regSuffix: PropTypes.string
};

export default HorizontalGroup;
