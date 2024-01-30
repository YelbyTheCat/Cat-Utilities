const getDateToday = () => {
  return new Date().toJSON().slice(0, 10);
};

module.exports = {
  getDateToday
};
