import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrepsFileType from './preps-file-type';
import PrepsFileTypeDetail from './preps-file-type-detail';
import PrepsFileTypeUpdate from './preps-file-type-update';
import PrepsFileTypeDeleteDialog from './preps-file-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrepsFileTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrepsFileTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrepsFileTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrepsFileType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrepsFileTypeDeleteDialog} />
  </>
);

export default Routes;
