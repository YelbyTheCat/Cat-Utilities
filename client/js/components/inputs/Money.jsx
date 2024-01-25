import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatMoney, formatProperty} from '../../helpers/format-helper';

const Money = ({className='mb-1', label, placeholder, disabled, property, value=''}) => {

  const [textValue, setTextValue] = useState(value);

  const handleOnBlur = value => {
    setTextValue(formatMoney(value));
  };

  return (
    <Form.Group controlId={property || formatProperty(label)} {...{className}}>
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        type="text" 
        value={textValue} 
        onChange={e => setTextValue(e.target.value)} 
        onBlur={e => !/^[a-zA-Z]+$/.test(textValue) && handleOnBlur(e.target.value)} 
        isInvalid={/^[a-zA-Z]+$/.test(textValue)}
        {...{placeholder, disabled}}/>
    </Form.Group>
  );
};

Money.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  value: PropTypes.string
};

export default Money;
