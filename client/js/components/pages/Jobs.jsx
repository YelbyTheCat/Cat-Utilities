import React, {useState, useEffect} from 'react';
import {createJob, deleteJob, getJobs} from '../../actions/jobs-actions';

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
      setJobs(data.rows);
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
      const res = await createJob(data);
      if (res.data) await fetchJobs();
    } catch (e) {
      // Do nothing
      console.error(e);
    }
  };

  const removeJob = async id => {
    try {
      const res = await deleteJob(id);
      if (res.data) await fetchJobs();
    } catch (e) {
      setError(`Failed to delete ${id}`);
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
            <JobsTable data={jobs} removeItem={removeJob}/>
          </div>
        )}
      </div>
      <JobsModal {...{show, setShow, onSubmit}}/>
    </>
  );
};

export default Jobs;
