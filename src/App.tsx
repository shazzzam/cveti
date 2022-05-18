import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage, FlightPage } from './pages';
import { ROUTES } from './consts/router';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={`${ROUTES.FLIGHT}/:id`} element={<FlightPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </Router>
  );
};
