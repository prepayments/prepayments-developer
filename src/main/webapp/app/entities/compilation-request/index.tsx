import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompilationRequest from './compilation-request';
import CompilationRequestDetail from './compilation-request-detail';
import CompilationRequestUpdate from './compilation-request-update';
import CompilationRequestDeleteDialog from './compilation-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompilationRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompilationRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompilationRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompilationRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompilationRequestDeleteDialog} />
  </>
);

export default Routes;
