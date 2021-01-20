import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrepaymentData from './prepayment-data';
import PrepaymentDataDetail from './prepayment-data-detail';
import PrepaymentDataUpdate from './prepayment-data-update';
import PrepaymentDataDeleteDialog from './prepayment-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrepaymentDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrepaymentDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrepaymentDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrepaymentData} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrepaymentDataDeleteDialog} />
  </>
);

export default Routes;
