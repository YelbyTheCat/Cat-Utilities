import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Text from '../inputs/Text';
import Bool from '../inputs/Bool';
import Money from '../inputs/Money';
import HorizontalGroup from '../inputs/HorizontalGroup';
import TextArea from '../inputs/TextArea';
import FormSubmit from '../buttons/FormSubmit';
import Date from '../inputs/Date';

const jobData = {
  companyName: 'CatsRUs',
  dateApplied: '2024-02-01',
  rangeMax: '200',
  rangeMin: '3',
  location: 'United States',
  heardBack: true,
  inProgress: false,
  denied: true,
  companySummary: 'I like animals',
  tasks: 'Do the thing',
  requirements: 'Have legs',
  benefits: 'there are none'
};

const Job = ({data}) => {

  const {jobId} = useParams();

  const methods = useForm({
    defaultValues: jobData
  });
  const {handleSubmit, watch} = methods;

  const onSubmit = data => {
    console.log('Form Submitted', data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text label="Company Name" placeholder="Company Name..."/>
          <Text label="Position"/>
          <HorizontalGroup>
            <Date label="Date Applied"/>
            <Money label="Range Max"/>
            <Money label="Range Min"/>
          </HorizontalGroup>
          <Text label="Location"/>
          <Bool label="Heard back"/>
          {watch('heardBack') && <Date label="Heard back date"/>}
          <Bool label="In Progress"/>
          <Bool label="Denied"/>
          {watch('denied') && <TextArea label='Denied Response'/>}
          <TextArea label='Company Summary'/>
          <TextArea label='Tasks'/>
          <TextArea label='Requirements'/>
          <TextArea label='Benefits'/>
          <FormSubmit/>
        </Form>
      </FormProvider>
      <pre>{JSON.stringify(watch(), 0, 2)}</pre>
    </>
  );
};


Job.propTypes = {

};


export default Job;
