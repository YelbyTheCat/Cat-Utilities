import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home
      <Link to="/jobs">
        <Button>Jobs</Button>
      </Link>
    </div>
  );
};


Home.propTypes = {

};


export default Home;
