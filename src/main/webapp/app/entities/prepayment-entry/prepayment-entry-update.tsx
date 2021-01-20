import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prepayment-entry.reducer';
import { IPrepaymentEntry } from 'app/shared/model/prepayment-entry.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrepaymentEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepaymentEntryUpdate = (props: IPrepaymentEntryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prepaymentEntryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prepayment-entry' + props.location.search);
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
        ...prepaymentEntryEntity,
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
          <h2 id="prepaymentsDevApp.prepaymentEntry.home.createOrEditLabel">Create or edit a PrepaymentEntry</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prepaymentEntryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prepayment-entry-id">ID</Label>
                  <AvInput id="prepayment-entry-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNameLabel" for="prepayment-entry-accountName">
                  Account Name
                </Label>
                <AvField id="prepayment-entry-accountName" type="text" name="accountName" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="prepayment-entry-description">
                  Description
                </Label>
                <AvField id="prepayment-entry-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNumberLabel" for="prepayment-entry-accountNumber">
                  Account Number
                </Label>
                <AvField id="prepayment-entry-accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentNumberLabel" for="prepayment-entry-prepaymentNumber">
                  Prepayment Number
                </Label>
                <AvField id="prepayment-entry-prepaymentNumber" type="text" name="prepaymentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentDateLabel" for="prepayment-entry-prepaymentDate">
                  Prepayment Date
                </Label>
                <AvField id="prepayment-entry-prepaymentDate" type="date" className="form-control" name="prepaymentDate" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionAmountLabel" for="prepayment-entry-transactionAmount">
                  Transaction Amount
                </Label>
                <AvField id="prepayment-entry-transactionAmount" type="text" name="transactionAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="uploadTokenLabel" for="prepayment-entry-uploadToken">
                  Upload Token
                </Label>
                <AvField id="prepayment-entry-uploadToken" type="text" name="uploadToken" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prepayment-entry" replace color="info">
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
  prepaymentEntryEntity: storeState.prepaymentEntry.entity,
  loading: storeState.prepaymentEntry.loading,
  updating: storeState.prepaymentEntry.updating,
  updateSuccess: storeState.prepaymentEntry.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepaymentEntryUpdate);
