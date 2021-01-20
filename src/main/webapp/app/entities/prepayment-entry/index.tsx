import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrepaymentEntry from './prepayment-entry';
import PrepaymentEntryDetail from './prepayment-entry-detail';
import PrepaymentEntryUpdate from './prepayment-entry-update';
import PrepaymentEntryDeleteDialog from './prepayment-entry-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrepaymentEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrepaymentEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrepaymentEntryDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrepaymentEntry} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrepaymentEntryDeleteDialog} />
  </>
);

export default Routes;
