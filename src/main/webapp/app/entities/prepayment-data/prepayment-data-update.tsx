import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prepayment-data.reducer';
import { IPrepaymentData } from 'app/shared/model/prepayment-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrepaymentDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepaymentDataUpdate = (props: IPrepaymentDataUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prepaymentDataEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prepayment-data' + props.location.search);
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
        ...prepaymentDataEntity,
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
          <h2 id="prepaymentsDevApp.prepaymentData.home.createOrEditLabel">Create or edit a PrepaymentData</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prepaymentDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prepayment-data-id">ID</Label>
                  <AvInput id="prepayment-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNameLabel" for="prepayment-data-accountName">
                  Account Name
                </Label>
                <AvField id="prepayment-data-accountName" type="text" name="accountName" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="prepayment-data-description">
                  Description
                </Label>
                <AvField id="prepayment-data-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNumberLabel" for="prepayment-data-accountNumber">
                  Account Number
                </Label>
                <AvField id="prepayment-data-accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="expenseAccountNumberLabel" for="prepayment-data-expenseAccountNumber">
                  Expense Account Number
                </Label>
                <AvField id="prepayment-data-expenseAccountNumber" type="text" name="expenseAccountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentNumberLabel" for="prepayment-data-prepaymentNumber">
                  Prepayment Number
                </Label>
                <AvField id="prepayment-data-prepaymentNumber" type="text" name="prepaymentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentDateLabel" for="prepayment-data-prepaymentDate">
                  Prepayment Date
                </Label>
                <AvField id="prepayment-data-prepaymentDate" type="date" className="form-control" name="prepaymentDate" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentAmountLabel" for="prepayment-data-prepaymentAmount">
                  Prepayment Amount
                </Label>
                <AvField id="prepayment-data-prepaymentAmount" type="text" name="prepaymentAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentPeriodsLabel" for="prepayment-data-prepaymentPeriods">
                  Prepayment Periods
                </Label>
                <AvField id="prepayment-data-prepaymentPeriods" type="string" className="form-control" name="prepaymentPeriods" />
              </AvGroup>
              <AvGroup>
                <Label id="uploadTokenLabel" for="prepayment-data-uploadToken">
                  Upload Token
                </Label>
                <AvField id="prepayment-data-uploadToken" type="text" name="uploadToken" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prepayment-data" replace color="info">
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
  prepaymentDataEntity: storeState.prepaymentData.entity,
  loading: storeState.prepaymentData.loading,
  updating: storeState.prepaymentData.updating,
  updateSuccess: storeState.prepaymentData.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepaymentDataUpdate);
