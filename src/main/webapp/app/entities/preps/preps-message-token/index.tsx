import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrepsMessageToken from './preps-message-token';
import PrepsMessageTokenDetail from './preps-message-token-detail';
import PrepsMessageTokenUpdate from './preps-message-token-update';
import PrepsMessageTokenDeleteDialog from './preps-message-token-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrepsMessageTokenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrepsMessageTokenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrepsMessageTokenDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrepsMessageToken} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrepsMessageTokenDeleteDialog} />
  </>
);

export default Routes;
