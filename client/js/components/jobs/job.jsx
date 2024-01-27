import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getJob} from '../../actions/jobs-actions';

import Alert from 'react-bootstrap/Alert';
import Bool from '../inputs/Bool';
import Button from 'react-bootstrap/Button';
import Date from '../inputs/Date';
import FormSubmit from '../buttons/FormSubmit';
import FormWrapper from '../FormWrapper';
import HorizontalGroup from '../inputs/HorizontalGroup';
import Money from '../inputs/Money';
import Text from '../inputs/Text';
import TextArea from '../inputs/TextArea';

const Job = () => {
  const navigate = useNavigate();
  const {jobId} = useParams();

  const [job, setJob] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await getJob(jobId.toString());
      const {data} = res;
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
      <Button onClick={() => navigate(-1)} variant="link">
        Back to Jobs
      </Button>
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

export default Job;
