import React from 'react';
import PropTypes from 'prop-types';

import {createColumnHelper} from '@tanstack/react-table';
import DisplayTable from './DisplayTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const JobsTable = ({data, paginationSize, removeItem}) => {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const defaultColumns = [
    columnHelper.display({
      header: '#',
      cell: info => (
        <div className="d-flex justify-content-center align-items-center">
          {(info.row.index + 1)}
        </div>
      )
    }),
    columnHelper.accessor('companyName', {
      header: 'Name',
    }),
    columnHelper.accessor('dateApplied', {
      header: 'Date Applied',
      type: 'date'
    }),
    columnHelper.accessor('position', {
      header: 'Position',
    }),
    columnHelper.accessor('heardBack', {
      header: 'Heard Back',
      type: 'boolean',
      cell: info => <FontAwesomeIcon icon={info.getValue() === 'true' ? faCheck : faX}/>
    }),
    columnHelper.accessor('inProgress', {
      header: 'Pending',
      type: 'boolean',
      cell: info => <FontAwesomeIcon icon={info.getValue() === 'true' ? faCheck : faX}/>
    }),
    columnHelper.accessor('denied', {
      header: 'Denied',
      type: 'boolean',
      cell: info => <FontAwesomeIcon icon={info.getValue() === 'true' ? faCheck : faX}/>
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

JobsTable.propTypes = {
  data: PropTypes.array,
  paginationSize: PropTypes.number,
  removeItem: PropTypes.func
};

export default JobsTable;
