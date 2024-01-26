import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getJobs} from '../../actions/jobs-actions';

import Alert from 'react-bootstrap/Alert';
import {formatArrayOfArraysToObject} from '../../helpers/format-helper';

const Jobs = () => {

  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      const {data} = res;
      console.log(res, data);
      const newData = formatArrayOfArraysToObject(data?.data?.values);
      setJobs(newData);
      setError(null);
    } catch (e) {
      setError("Couldn't get jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      <div>
      Jobs
      </div>
      <pre>{JSON.stringify(jobs, 0, 2)}</pre>
    </>
  );
};


Jobs.propTypes = {

};


export default Jobs;
