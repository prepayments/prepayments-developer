import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AmortizationEntry from './amortization-entry';
import PrepaymentEntry from './prepayment-entry';
import PrepaymentData from './prepayment-data';
import PrepsFileType from './preps/preps-file-type';
import PrepsFileUpload from './preps/preps-file-upload';
import PrepsMessageToken from './preps/preps-message-token';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}amortization-entry`} component={AmortizationEntry} />
      <ErrorBoundaryRoute path={`${match.url}prepayment-entry`} component={PrepaymentEntry} />
      <ErrorBoundaryRoute path={`${match.url}prepayment-data`} component={PrepaymentData} />
      <ErrorBoundaryRoute path={`${match.url}preps-file-type`} component={PrepsFileType} />
      <ErrorBoundaryRoute path={`${match.url}preps-file-upload`} component={PrepsFileUpload} />
      <ErrorBoundaryRoute path={`${match.url}preps-message-token`} component={PrepsMessageToken} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
