import React from 'react';
import PropTypes from 'prop-types';

import {createColumnHelper} from '@tanstack/react-table';
import DisplayTable from './DisplayTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

const JobsTable = ({data, paginationSize}) => {

  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const defaultColumns = [
    columnHelper.accessor('companyName', {
      header: 'Name',
    }),
    columnHelper.accessor('dateApplied', {
      header: 'Date Applied',
    }),
    columnHelper.accessor('position', {
      header: 'Position',
    }),
    columnHelper.accessor('heardBack', {
      header: 'Heard Back',
      cell: info => <FontAwesomeIcon icon={info.getValue()?.toLowerCase() === 'true' ? faCheck : faX}/>
    }),
    columnHelper.accessor('inProgress', {
      header: 'Pending',
      cell: info => <FontAwesomeIcon icon={info.getValue()?.toLowerCase() === 'true' ? faCheck : faX}/>
    }),
    columnHelper.accessor('denied', {
      header: 'Denied',
      cell: info => <FontAwesomeIcon icon={info.getValue()?.toLowerCase() === 'true' ? faCheck : faX}/>
    })
  ];

  return (
    <DisplayTable onRowClick={id => navigate(`${id.toString()}`)} showIndex columns={defaultColumns} {...{data, paginationSize}}/>
  );
};

JobsTable.propTypes = {
  data: PropTypes.array,
  paginationSize: PropTypes.number,
};

export default JobsTable;
