import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {useFormContext} from 'react-hook-form';
import {formatProperty} from '../../helpers/format-helper';

const Dropdown = ({className='mb-1', label='', disabled, property, options}) => {
  const {register} = useFormContext();
  const controlId = property || formatProperty(label);

  return (
    <Form.Group {...{className, controlId}}>
      <Form.Label>{label}</Form.Label>
      <Form.Select {...register(controlId)} {...{disabled}}>
        {options.map(o => <option key={o.toString()} value={o.toString()}>{o}</option>)}
      </Form.Select>
    </Form.Group>
  );
};


Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string,
  options: PropTypes.array,
};


export default Dropdown;
