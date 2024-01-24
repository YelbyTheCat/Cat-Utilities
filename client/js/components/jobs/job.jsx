import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';


const Job = () => {

  const {jobId} = useParams();

  return (
    <div>
      I am a job {jobId}
    </div>
  );
};


Job.propTypes = {

};


export default Job;
