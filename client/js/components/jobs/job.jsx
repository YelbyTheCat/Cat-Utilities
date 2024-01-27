import React, {useState, useEffect} from 'react';
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
import FormWrapper from '../FormWrapper';
import {getJob} from '../../actions/jobs-actions';
import Alert from 'react-bootstrap/Alert';

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

const Job = () => {

  const {jobId} = useParams();

  const [job, setJob] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await getJob(jobId.toString());
      // console.log(res);
      const {data} = res;
      // console.log(data);
      console.log('data.data[0]', data.data[0]);
      setJob(data.data[0]);
      setHeaders(data.headers);
      setError(null);
    } catch (e) {
      setJob(null);
      setError(`Couldn't fetch job with id ${jobId}`);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const onSubmit = data => {
    console.log('Form Submitted', data);
  };


  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {job && <FormWrapper data={job} debugMode {...{onSubmit}}>
        <Text label="Company Name" placeholder="Company Name..."/>
        <HorizontalGroup>
          <Text label="Position"/>
          <Text label="Location"/>
        </HorizontalGroup>
        <HorizontalGroup>
          <Date label="Date Applied"/>
          <Money label="Range Max"/>
          <Money label="Range Min"/>
        </HorizontalGroup>
        <Bool label="Heard back"/>
        <Date label="Heard back date"/>
        <TextArea label='Heard back Response'/>
        <Bool label="In Progress"/>
        <Bool label="Denied"/>
        <TextArea label='Denied Response'/>
        <TextArea label='Company Summary'/>
        <TextArea label='Tasks'/>
        <TextArea label='Requirements'/>
        <TextArea label='Benefits'/>
        <FormSubmit/>
      </FormWrapper>}
    </>
  );
};


Job.propTypes = {

};


export default Job;
