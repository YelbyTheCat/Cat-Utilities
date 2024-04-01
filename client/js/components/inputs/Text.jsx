import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatProperty} from '../../helpers/format-helper.js';
import {useFormContext} from 'react-hook-form';

const Text = ({className='mb-1', label='', placeholder, disabled, property, as, reg}) => {
  const {register} = useFormContext();
  const controlId = property ? property : formatProperty(label);
  const control = reg || controlId;

  console.log(`${label} | ${reg}`);
  console.log('Text - controlId: ', `${property} | ${formatProperty(label)}`);
  console.log('Text - Registration: ', `${reg} | ${controlId} | ${control}`);

  return (
    <Form.Group {...{className}} controlId={control}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control type="text" {...register(control)} {...{placeholder, disabled, as,}}/>
    </Form.Group>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  as: PropTypes.string,
  reg: PropTypes.string
};

export default Text;
