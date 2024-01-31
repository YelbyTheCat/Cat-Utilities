/**
 * Takes in an array of objects and sorts it by 'dateApplied' then 'companyName'
 * @param {Array} data Array of objects
 */

const sortArrayOfObjects = data => {
  const sortedArray = structuredClone(data);

  sortedArray.sort((a, b) => {
    const dateComparison = new Date(a.dateApplied) - new Date(b.dateApplied);
    return dateComparison === 0 ? a.companyName.localeCompare(b.companyName) : dateComparison;
  });

  return sortedArray;
};

module.exports = {
  sortArrayOfObjects
};
