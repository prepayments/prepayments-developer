import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrepsFileUpload from './preps-file-upload';
import PrepsFileUploadDetail from './preps-file-upload-detail';
import PrepsFileUploadUpdate from './preps-file-upload-update';
import PrepsFileUploadDeleteDialog from './preps-file-upload-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrepsFileUploadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrepsFileUploadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrepsFileUploadDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrepsFileUpload} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrepsFileUploadDeleteDialog} />
  </>
);

export default Routes;
