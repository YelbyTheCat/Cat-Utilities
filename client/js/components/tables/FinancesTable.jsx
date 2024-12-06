import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {createColumnHelper} from '@tanstack/react-table';
import {Button} from 'react-bootstrap';
import DisplayTable from './DisplayTable';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FinancesTable = ({data, paginationSize, removeItem}) => {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const defaultColumns = [
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: info => (`$${info.getValue()}`)
    }),
    columnHelper.accessor('companyName', {
      header: 'Company'
    }),
    columnHelper.accessor('transactionType', {
      header: 'D/C',
      type: 'select',
      data: {options: [{value: 'Debit', label: 'Debit (Money Out)'}, {value: 'Credit', label: 'Credit (Money In)'}, 'Pizza']},
      cell: info => <FontAwesomeIcon style={{color: info.getValue() === 'Debit' ? 'red' : 'green'}} icon={info.getValue() === 'Debit' ? faArrowDown : faArrowUp}/>
    }),
    columnHelper.display({
      header: 'Actions',
      cell: info => (
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="danger" onClick={e => {e.stopPropagation(); info.table.options.meta.removeObj(info.row);}}>X</Button>
        </div>
      )
    })
  ];

  return (
    <DisplayTable onRowClick={id => navigate(`${id.toString()}`)} showIndex columns={defaultColumns} {...{data, paginationSize, removeItem}}/>
  );
};


FinancesTable.propTypes = {
  data: PropTypes.array,
  paginationSize: PropTypes.number,
  removeItem: PropTypes.func
};


export default FinancesTable;
