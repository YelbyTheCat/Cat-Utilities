import React from 'react';

import {Routes as RoutesComponent, Route} from 'react-router-dom';
import Home from './pages/Home';
import Money from './pages/Money';

import Jobs from './pages/Jobs';
import Job from './jobs/job';
import Layout from './Layout';

const Routes = () => {
  return (
    <RoutesComponent>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="money" element={<Money/>}/>
        <Route path="jobs">
          <Route index element={<Jobs/>}/>
          <Route path=":jobId" element={<Job/>}/>
        </Route>
        <Route path="*" element={<div>404 Cool guy not found</div>}/>
      </Route>
    </RoutesComponent>
  );
};

export default Routes;
