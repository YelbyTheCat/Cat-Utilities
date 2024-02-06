import React, {useState, useEffect} from 'react';
import {createJob, getJobs} from '../../actions/jobs-actions';

import Alert from 'react-bootstrap/Alert';
import JobsTable from '../tables/JobsTable';
import NewButton from '../buttons/NewButton';
import JobsModal from '../modals/JobsModal';

const Jobs = () => {

  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      const {data} = res;
      setJobs(data);
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
      const highestId = Math.max.apply(null, jobs.map(job => {return job.id;}));
      data.id = jobs.length ? highestId + 1 : 1;
      console.log('before await', data);
      const res = await createJob(data);
      if (res.data) await fetchJobs();
    } catch (e) {
      // Do nothing
      console.error(e);
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
