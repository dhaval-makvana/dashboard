import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
const DashboardPage = lazy(() => import('./pages/dashboardPage'));
const DetailsPage = lazy(() => import('./pages/detailsPage'));
const LoginPage = lazy(() => import('./pages/login'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>...loading</div>}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path='/' component={DashboardPage} />
          <Route exact path='/:id' component={DetailsPage} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
