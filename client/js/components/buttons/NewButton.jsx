import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

const NewButton = ({className, label='New', variant='success', onClick}) => (
  <Button {...{className, variant, onClick}}>
    {label}
  </Button>
);

NewButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

export default NewButton;
