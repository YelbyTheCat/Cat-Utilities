const _ = require('lodash');
const jobHeader = require('../../../models/headers/job');

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
  // const lowerCase = text.toLowerCase();
  // const trimmed = lowerCase.replace(/\s+/g, ' ').trim();
  // const camelCase = trimmed.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
  //   return index === 0 ? word.toLowerCase() : word.toUpperCase();
  // }).replace(/\s+/g, '');
  // return camelCase;
  return _.camelCase(text);
};

const createObject = (headers, data = []) => {
  const dataObject = {};
  for (let i = 0; i < headers.length; i++) {
    dataObject[headers[i]] = data.length > i ? data[i] : null;
  }
  return dataObject;
};

/**
 * Turns an array of arrays into an array of objects
 * @param {*} data an array of arrays
 * @returns {*} An array of objects
 */
const formatArrayOfArraysToObject = data => {
  const headers = data[0];

  const newData = [];
  for (let i = 1; i < data.length; i++) {
    const current = data[i];
    const dataObject = createObject(headers, current);
    newData.push(dataObject);
  }

  return newData;
};

const createObjectFromHeader = (header, row) => {
  const dataObject = {};
  for (let i = 0; i < header.length; i++) {
    dataObject[header[i].property] = row.length > i ? row[i] : null;
  }
  return dataObject;
};

/**
 * Takes in JOB 2d array and turns it into an array of objects
 * @param {array} data array of arrays
 * @return {array} An array of objects
 */
const formatJobsArrayOfArraysToObjectArray = data => {
  return data.map(row => (createObjectFromHeader(jobHeader, row)));
};

const formatJobsArrayToObjectArray = row => {
  return createObjectFromHeader(jobHeader, row);
};

const createRowFromObject = (header, obj) => {
  const newRow = [];
  for (let i = 0; i < header.length; i++) {
    newRow[i] = obj[header[i].property] || '';
  }
  return newRow;
};

const formatJobObjectArrayToJobsArray = data => {
  return data.map(job => createRowFromObject(jobHeader, job));
};

const formatJobObjectToJobsArray = data => {
  return createRowFromObject(jobHeader, data);
};

const formatObjectToArray = (header, data) => {
  const newArrayItem = [];
  for (let i = 0; i < header.length; i++) {
    const name = header[i];
    newArrayItem.push(data[name] || '');
  }
  return newArrayItem;
};

module.exports = {
  formatMoney,
  formatArrayOfArraysToObject,
  formatProperty,
  formatObjectToArray,
  formatJobsArrayOfArraysToObjectArray,
  formatJobObjectArrayToJobsArray,
  formatJobObjectToJobsArray,
  formatJobsArrayToObjectArray
};
