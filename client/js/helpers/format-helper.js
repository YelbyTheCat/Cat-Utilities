const _ = require('lodash');

export const formatMoney = value => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(value);
};


/**
 * @param {string} text 
 * @return {string} camelCase
 */
export const formatProperty = text => {
  // const lowerCase = text.toLowerCase();
  // const trimmed = lowerCase.replace(/\s+/g, ' ').trim();
  // const camelCase = trimmed.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
  //   return index === 0 ? word.toLowerCase() : word.toUpperCase();
  // }).replace(/\s+/g, '');
  // return camelCase;
  return _.camelCase(text);
};
