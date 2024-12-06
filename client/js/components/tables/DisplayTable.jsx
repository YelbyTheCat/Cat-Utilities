import React, {useState, useRef, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import {flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import Filter from './Filter';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import './styles.css';

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
}

const DisplayTable = ({data = [], columns, onRowClick, removeItem, striped}) => {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [autoResetPageIndex/*, skipAutoResetPageIndex*/] = useSkipper();
  const [dataLength, setDataLength] = useState(data?.length || 0);

  const handleFilter = (value, columnId) => {
    const columnFiltersClone = structuredClone(columnFilters);
    const index = columnFiltersClone.findIndex(item => item.id === columnId);

    if (index === -1 && value.length > 0) {
      // Add
      columnFiltersClone.push({ id: columnId, value });
    } else if (index > -1 && value.length > 0) {
      // Update
      columnFiltersClone[index].value = value;
    } else {
      // Remove
      columnFiltersClone.splice(index, 1);
    }

    return columnFiltersClone;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters
    },
    autoResetPageIndex,
    meta: {
      updateFilter: (value, columnId) => {
        const newFilters = handleFilter(value, columnId);
        setColumnFilters(newFilters);
      },
      removeObj: row => {
        const {original} = row;
        removeItem(original.id);
      }
    }
  });

  const sortDirection = direction => {
    if (!direction) return null;
    return direction === 'asc' ? '\u25b2' : '\u25bc';
  };

  useEffect(() => {
    const pageSize = table.options.state.pagination.pageSize;
    const currentPageIndex = table.options.state.pagination.pageIndex;
    const pageCount = table.getPageCount();

    // Add Item
    if (data.length > dataLength) {
      const newPageIndex = Math.ceil(data.length / pageSize) - 1;
      table.setPageIndex(newPageIndex);
    }

    if (data.length < dataLength) {
      // Last page
      if (currentPageIndex === pageCount) {
        table.setPageIndex(pageCount - 1);
      } else {
        table.setPageIndex(currentPageIndex);
      }
    }
    setDataLength(data.length);
  }, [data]);

  useEffect(() => {
    // Check if the content is truncated and add a tooltip if it is
    document.querySelectorAll('.truncate').forEach(item => {
      if (item.scrollWidth > item.clientWidth) {
        item.setAttribute('title', item.textContent);
      } else {
        item.removeAttribute('title');
      }
    });
  }, [table.getRowModel().rows]);

  return (
    <>
      <Table hover responsive size="sm" {...{striped}}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {/* {showIndex && <th>#</th>} */}
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()}>
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sortDirection(header.column.getIsSorted())}
                  </div>
                </th>
              ))}
            </tr>
          ))}
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  <div style={{alignContent: 'center'}}>
                    {header.column.getCanFilter() ? (
                      <Filter filterValue={header.column.getFilterValue() || ''} updateTable={table.options.meta.updateFilter} columnId={header.id} type={header.column.columnDef?.type} data={header.column.columnDef?.data}/>
                    ) : (
                      <br/>
                    )}
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
                  <td key={cell.id} className="truncate" style={{verticalAlign: 'middle'}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan={table.getHeaderGroups()[0].headers.length?.toString() + 1}>
                No Jobs to display
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DropdownButton
          className="me-1"
          variant="text"
          title={table.options.state.pagination.pageSize}
          defaultValue={10}
          onSelect={e => table.setPageSize(e)}
          size="sm"
        >
          <Dropdown.Item eventKey="5">5</Dropdown.Item>
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="20">20</Dropdown.Item>
          <Dropdown.Item eventKey="30">30</Dropdown.Item>
          <Dropdown.Item eventKey="40">40</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
          <Dropdown.Item eventKey="60">60</Dropdown.Item>
          <Dropdown.Item eventKey="70">70</Dropdown.Item>
          <Dropdown.Item eventKey="80">80</Dropdown.Item>
          <Dropdown.Item eventKey="90">90</Dropdown.Item>
          <Dropdown.Item eventKey="100">100</Dropdown.Item>
        </DropdownButton>
        <div className="d-flex">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="text" style={{border: '0px'}} disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)} size="sm">{'<<'}</Button>
            <Button className="me-1" style={{border: '0px'}} variant="text" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} size="sm">{'<'}</Button>
            {`${table.options.state.pagination.pageIndex + 1} / ${table.getPageCount()}`}
            <Button className="ms-1" variant="text" style={{border: '0px'}} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size="sm">{'>'}</Button>
            <Button variant="text" style={{border: '0px'}} disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)} size="sm">{'>>'}</Button>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(columnFilters, 0, 2)}</pre>
    </>
  );
};

DisplayTable.propTypes = {
  data: PropTypes.array,
  header: PropTypes.array,
  columns: PropTypes.array,
  onRowClick: PropTypes.func,
  paginationSize: PropTypes.number,
  showIndex: PropTypes.bool,
  removeItem: PropTypes.func,
  striped: PropTypes.bool
};

export default DisplayTable;
