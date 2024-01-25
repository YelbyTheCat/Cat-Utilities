import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Text from '../inputs/Text';
import Bool from '../inputs/Bool';
import Money from '../inputs/Money';
import HorizontalGroup from '../inputs/HorizontalGroup';
import TextArea from '../inputs/TextArea';
import FormSubmit from '../buttons/FormSubmit';

const Job = ({data}) => {

  const {jobId} = useParams();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target[1].value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text label="Company Name" placeholder="Company Name..."/>
      <HorizontalGroup>
        <Money label="Range Max"/>
        <Money label="Range Min"/>
      </HorizontalGroup>
      <Bool label="Heard back"/>
      <Bool label="In Progress"/>
      <Bool label="Denied"/>
      <TextArea label='Company Summary'/>
      <TextArea label='Tasks'/>
      <TextArea label='Requirements'/>
      <TextArea label='Benefits'/>
      <FormSubmit/>
    </Form>
  );
};


Job.propTypes = {

};


export default Job;
