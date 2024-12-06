import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

const Filter = ({filterValue, updateTable, columnId, type, data}) => {
  const [value, setValue] = useState(filterValue || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      updateTable(value, columnId);
    }, 1*1000);
    return () => {clearTimeout(handler);};
  }, [value]);

  useEffect(() => {
    setValue(filterValue);
  }, [filterValue]);

  const renderSpecific = () => {
    switch (type) {
      case 'boolean': return (
        <Form.Select onChange={e => setValue(e.target.value)} {...{value}}>
          <option value="">{' '}</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </Form.Select>
      );
      case 'select': return (
        <Form.Select onChange={e => setValue(e.target.value)} {...{value}}>
          <option value="">{' '}</option>
          {data.options.map((item, index) => {
            const value = item?.value || item;
            const label = item?.label || item;
            return <option key={index} {...{value}}>{label}</option>;
          })}
        </Form.Select>
      );
      case 'date': return <Form.Control type="date" onChange={e => setValue(e.target.value)} {...{value}}/>;
      default: return <Form.Control type="text" onChange={e => setValue(e.target.value)} {...{value}}/>;  
    }
  };

  return (
    <div>
      {renderSpecific()}
    </div>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  updateTable: PropTypes.func,
  columnId: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object
};

export default Filter;
