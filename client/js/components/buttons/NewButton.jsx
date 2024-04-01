import React from 'react';
import PropTypes from 'prop-types';

import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';

const NewButton = ({className, label='New', variant='success', onClick, size}) => (
  <IconButton variant="success" icon={faPlusCircle} {...{className, variant, onClick, size, label}}/>
);

NewButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg', 'xl'])
};

export default NewButton;
