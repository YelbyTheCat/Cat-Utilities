import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {formatMoney, formatProperty} from '../../helpers/format-helper.js';
import {useFormContext} from 'react-hook-form';

const Money = ({className='mb-1', label, placeholder, disabled, property, reg}) => {
  const {register, setValue} = useFormContext();
  const controlId = property || formatProperty(label);

  const handleChange = e => {
    const {value} = e.target;
    const formattedValue = formatMoney(value);
    setValue(reg || controlId, formattedValue, {shouldValidate: true});
  };

  console.log('Mone - Registration: ', `${reg} | ${controlId}`);

  return (
    <Form.Group {...{className}} controlId={reg || controlId}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          type="text"
          {...register((reg || controlId), {onBlur: handleChange})}
          {...{placeholder, disabled}}/>
      </InputGroup>
    </Form.Group>
  );
};

Money.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  value: PropTypes.string,
  reg: PropTypes.string
};

export default Money;
