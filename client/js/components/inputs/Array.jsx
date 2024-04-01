import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { formatProperty } from '../../helpers/format-helper';
import IconButton from '../buttons/IconButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NewButton from '../buttons/NewButton';
import {getFormId} from '../../helpers/misc-helper';

const Array = ({ className = 'mb-1', label = '', property, children }) => {
  const { control } = useFormContext();
  const controlId = property || formatProperty(label);
  const { fields, append, remove } = useFieldArray({ control, name: controlId });

  const createAppend = () => {
    const childs = React.Children;
    const idKeys = {};

    childs.map(children?.length ? children : children.props.children, child => {
      const formId = getFormId(child);
      idKeys[formId] = '';
    });

    return idKeys;
  };

  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      {fields.map((field, idx) => (
        <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          {React.Children.map(children, (child, index) => (
            <div key={index}>
              {React.cloneElement(child, {
                name: `${controlId}[${idx}].${child.props.property}`,
                reg: `${controlId}[${idx}].${child.props.property}`, // Pass reg to child components
                regSuffix: `${controlId}[${idx}].`,
                ...child.props
              })}
            </div>
          ))}
          <IconButton className="ms-3" icon={faTimes} onClick={() => remove(idx)} variant="danger"/>
        </div>
      ))}
      <NewButton onClick={() => append(createAppend())} label="Add Detail" size="sm"/>
    </Form.Group>
  );
};

Array.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  property: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Array;
