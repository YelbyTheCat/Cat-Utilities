import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatProperty} from '../../helpers/format-helper.js';
import {useFormContext} from 'react-hook-form';

const Date = ({className='mb-1', label='', placeholder, disabled, property, as}) => {
  const {register} = useFormContext();
  const controlId = property || formatProperty(label);

  return (
    <Form.Group {...{className, controlId}}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="date" {...register(controlId)} {...{placeholder, disabled, as,}}/>
    </Form.Group>
  );
};

Date.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  as: PropTypes.string
};

export default Date;
