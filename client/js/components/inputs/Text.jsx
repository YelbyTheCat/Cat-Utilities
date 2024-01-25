import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatProperty} from '../../helpers/format-helper';

const Text = ({className='mb-1', label='', placeholder, disabled, property, as}) => (
  <Form.Group controlId={property || formatProperty(label)} {...{className}}>
    <Form.Label>{label}</Form.Label>
    <Form.Control type="text" {...{placeholder, disabled, as}}/>
  </Form.Group>
);

Text.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  as: PropTypes.string
};

export default Text;
