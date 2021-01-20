import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AmortizationEntry from './amortization-entry';
import AmortizationEntryDetail from './amortization-entry-detail';
import AmortizationEntryUpdate from './amortization-entry-update';
import AmortizationEntryDeleteDialog from './amortization-entry-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AmortizationEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AmortizationEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AmortizationEntryDetail} />
      <ErrorBoundaryRoute path={match.url} component={AmortizationEntry} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AmortizationEntryDeleteDialog} />
  </>
);

export default Routes;
