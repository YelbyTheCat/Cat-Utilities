import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

const Filter = ({data, updateTable, columnId, type}) => {
  const [value, setValue] = useState(data || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      updateTable(value, columnId);
    }, 1*1000);
    return () => {clearTimeout(handler);};
  }, [value]);

  useEffect(() => {
    setValue(data);
  }, [data]);

  const renderSpecific = () => {
    switch (type) {
      case 'boolean': return (
        <Form.Select onChange={e => setValue(e.target.value)} {...{value}}>
          <option value="">{' '}</option>
          <option value="true">True</option>
          <option value="false">False</option>
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
  data: PropTypes.string,
  updateTable: PropTypes.func,
  columnId: PropTypes.string,
  type: PropTypes.string
};

export default Filter;
