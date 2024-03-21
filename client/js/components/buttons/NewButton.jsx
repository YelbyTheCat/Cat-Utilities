import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const NewButton = ({className, label='New', variant='success', onClick, size}) => (
  <Button {...{className, variant, onClick, size}}>
    <FontAwesomeIcon icon={faPlusCircle}/> {label}
  </Button>
);

NewButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg', 'xl'])
};

export default NewButton;
