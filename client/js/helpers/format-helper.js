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

/**
 * 
 * @param {Array} data 
 * @returns {Array}
 */
const convertBooleanToString = data => {
  const dataClone = structuredClone(data);
  dataClone.rows = dataClone.rows.map(obj => {
    const newObj = {};
    for (const key in obj) {
      if (typeof obj[key] === 'boolean') {
        newObj[key] = obj[key].toString();
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  });
  
  return dataClone;
};

module.exports = {
  formatMoney,  
  formatProperty,
  convertBooleanToString
};
