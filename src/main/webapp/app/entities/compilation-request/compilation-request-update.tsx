import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './compilation-request.reducer';
import { ICompilationRequest } from 'app/shared/model/compilation-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompilationRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompilationRequestUpdate = (props: ICompilationRequestUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { compilationRequestEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/compilation-request' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...compilationRequestEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="prepaymentsDevApp.compilationRequest.home.createOrEditLabel">Create or edit a CompilationRequest</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : compilationRequestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="compilation-request-id">ID</Label>
                  <AvInput id="compilation-request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="compilation-request-description">
                  Description
                </Label>
                <AvField id="compilation-request-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="fileUploadIdLabel" for="compilation-request-fileUploadId">
                  File Upload Id
                </Label>
                <AvField id="compilation-request-fileUploadId" type="string" className="form-control" name="fileUploadId" />
              </AvGroup>
              <AvGroup>
                <Label id="compilationStatusLabel" for="compilation-request-compilationStatus">
                  Compilation Status
                </Label>
                <AvInput
                  id="compilation-request-compilationStatus"
                  type="select"
                  className="form-control"
                  name="compilationStatus"
                  value={(!isNew && compilationRequestEntity.compilationStatus) || 'IN_PROGRESS'}
                >
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETE">COMPLETE</option>
                  <option value="FAILED">FAILED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="compilationTypeLabel" for="compilation-request-compilationType">
                  Compilation Type
                </Label>
                <AvInput
                  id="compilation-request-compilationType"
                  type="select"
                  className="form-control"
                  name="compilationType"
                  value={(!isNew && compilationRequestEntity.compilationType) || 'AMORTIZATION_ENTRY_COMPILATION'}
                >
                  <option value="AMORTIZATION_ENTRY_COMPILATION">AMORTIZATION_ENTRY_COMPILATION</option>
                  <option value="PREPAYMENT_ENTRY_COMPILATION">PREPAYMENT_ENTRY_COMPILATION</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="compilationTokenLabel" for="compilation-request-compilationToken">
                  Compilation Token
                </Label>
                <AvField id="compilation-request-compilationToken" type="text" name="compilationToken" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/compilation-request" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  compilationRequestEntity: storeState.compilationRequest.entity,
  loading: storeState.compilationRequest.loading,
  updating: storeState.compilationRequest.updating,
  updateSuccess: storeState.compilationRequest.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompilationRequestUpdate);
