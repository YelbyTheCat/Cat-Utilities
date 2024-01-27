import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import {formatProperty} from '../../helpers/format-helper.js';
import {useFormContext} from 'react-hook-form';

const Bool = ({className='mb-1', label, placeholder, disabled, property}) => {
  const {register} = useFormContext();
  const controlId = property || formatProperty(label);

  return (
    <Form.Group {...{className, controlId}}>
      <Form.Check type="checkbox" {...register(controlId)} {...{label, placeholder, disabled}}/>
    </Form.Group>
  );
};

Bool.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string
};

export default Bool;
