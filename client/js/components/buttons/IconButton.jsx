import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const IconButton = ({className, label, variant, onClick, size, iconOnly, icon}) => (
  <Button {...{className, variant, onClick, size}}>
    {iconOnly ? (
      <FontAwesomeIcon {...{icon}}/>
    ) : (
      <>
        <FontAwesomeIcon {...{icon}}/> {label}
      </>
    )}
  </Button>
);

IconButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  iconOnly: PropTypes.bool,
  icon: PropTypes.object
};

export default IconButton;
