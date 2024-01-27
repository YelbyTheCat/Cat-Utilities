import React, {useState, useEffect} from 'react';
import {createJob, getJobs} from '../../actions/jobs-actions';
import {formatArrayOfArraysToObject, formatObjectToArray} from '../../helpers/format-helper';

import Alert from 'react-bootstrap/Alert';
import JobsTable from '../tables/JobsTable';
import NewButton from '../buttons/NewButton';
import JobsModal from '../modals/JobsModal';

const Jobs = () => {

  const [jobs, setJobs] = useState(null);
  const [header, setHeader] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      const {data} = res;
      const newData = formatArrayOfArraysToObject([data.header, ...data.data]);
      setJobs(newData);
      setHeader(data.header);
      setError(null);
    } catch (e) {
      setError("Couldn't get jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async data => {
    setShow(false);
    try {
      const formattedData = formatObjectToArray(header, data);
      const highestId = Math.max.apply(null, jobs.map(job => {return job.id;}));
      formattedData[0] = highestId + 1;
      await createJob({data: formattedData});
      await fetchJobs();
    } catch (e) {
      // Do nothing
    }
  };

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      <div>
        Jobs
        {jobs && (
          <div>
            <NewButton label="New Job" onClick={() => setShow(true)}/>
            <NewButton className="ms-1" label="Refresh" variant='link' onClick={async () => await fetchJobs()}/>
            <JobsTable data={jobs} paginationSize={100}/>
          </div>
        )}
      </div>
      <JobsModal {...{show, setShow, onSubmit}}/>
    </>
  );
};

export default Jobs;
