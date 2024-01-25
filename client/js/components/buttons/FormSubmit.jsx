import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

const FormSubmit = ({className, label='Submit', variant='success'}) => (
  <Button type="submit" {...{className, variant}}>
    {label}
  </Button>
);

FormSubmit.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string
};

export default FormSubmit;
