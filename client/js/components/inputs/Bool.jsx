import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatProperty} from '../../helpers/format-helper';

const Bool = ({className='mb-1', label, placeholder, disabled, property}) => (
  <Form.Group controlId={property || formatProperty(label)} {...{className}}>
    <Form.Check type="checkbox" {...{label, placeholder, disabled}}/>
  </Form.Group>
);

Bool.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string
};

export default Bool;
