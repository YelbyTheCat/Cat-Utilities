const {formatProperty} = require('./format-helper');

const getFormId = child => {
  const {props} = child;

  if (!props.property && !props.label) return;

  if (props.property) return props.property;
  
  return formatProperty(props.label);
};

module.exports = {
  getFormId
};
