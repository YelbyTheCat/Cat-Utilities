import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';


const TextArea = ({className, label, placeholder, disabled, property, rows=3}) => (
  <Text as='textarea' {...{rows, className, label, placeholder, disabled, property}}/>
);

TextArea.propTypes = {
  rows: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  property: PropTypes.string
};

export default TextArea;
