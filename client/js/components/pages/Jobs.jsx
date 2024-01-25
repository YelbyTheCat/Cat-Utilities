import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';


const Jobs = () => {

  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);

  const getJobs = async () => {
    // try {
    //   const res = getServerSideProps({});
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <div>
      Jobs
    </div>
  );
};


Jobs.propTypes = {

};


export default Jobs;
