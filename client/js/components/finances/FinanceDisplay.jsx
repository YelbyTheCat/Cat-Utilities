import React from 'react';
import PropTypes from 'prop-types';
import FinancesTable from '../tables/FinancesTable';


const FinanceDisplay = ({finances}) => {
  return (
    <div>
      <FinancesTable data={finances}/>
    </div>
  );
};

FinanceDisplay.propTypes = {
  finances: PropTypes.array
};

export default FinanceDisplay;
