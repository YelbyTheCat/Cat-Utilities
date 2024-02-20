const _ = require('lodash');

/**
 * 
 * @param {string} value 
 * @returns 
 */
const formatMoney = value => {
  const amount = value.replace('$', '').replace(',', '');
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(amount);
};


/**
 * Convert label into camel cased property name
 * @param {string} text 
 * @return {string} camelCase
 */
const formatProperty = text => {
  return _.camelCase(text);
};

module.exports = {
  formatMoney,  
  formatProperty
};
