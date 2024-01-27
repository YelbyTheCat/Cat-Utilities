import React from 'react';
import PropTypes from 'prop-types';

import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';

const DisplayTable = ({data, columns, onRowClick}) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table hover responsive size="sm" striped>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                <div>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => onRowClick(row.original.id)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className="text-center" colSpan={table.getHeaderGroups()[0].headers.length}>
            <td>
              No Jobs to display
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

DisplayTable.propTypes = {
  data: PropTypes.array,
  header: PropTypes.array,
  columns: PropTypes.array,
  onRowClick: PropTypes.func
};

export default DisplayTable;
