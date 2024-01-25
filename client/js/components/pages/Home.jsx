import React from 'react';

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

export default Home;
