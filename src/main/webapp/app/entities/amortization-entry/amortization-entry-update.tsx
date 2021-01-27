import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './amortization-entry.reducer';
import { IAmortizationEntry } from 'app/shared/model/amortization-entry.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAmortizationEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AmortizationEntryUpdate = (props: IAmortizationEntryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { amortizationEntryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/amortization-entry' + props.location.search);
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
        ...amortizationEntryEntity,
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
          <h2 id="prepaymentsDevApp.amortizationEntry.home.createOrEditLabel">Create or edit a AmortizationEntry</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : amortizationEntryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="amortization-entry-id">ID</Label>
                  <AvInput id="amortization-entry-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNameLabel" for="amortization-entry-accountName">
                  Account Name
                </Label>
                <AvField id="amortization-entry-accountName" type="text" name="accountName" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="amortization-entry-description">
                  Description
                </Label>
                <AvField id="amortization-entry-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNumberLabel" for="amortization-entry-accountNumber">
                  Account Number
                </Label>
                <AvField id="amortization-entry-accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="expenseAccountNumberLabel" for="amortization-entry-expenseAccountNumber">
                  Expense Account Number
                </Label>
                <AvField id="amortization-entry-expenseAccountNumber" type="text" name="expenseAccountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentNumberLabel" for="amortization-entry-prepaymentNumber">
                  Prepayment Number
                </Label>
                <AvField id="amortization-entry-prepaymentNumber" type="text" name="prepaymentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentDateLabel" for="amortization-entry-prepaymentDate">
                  Prepayment Date
                </Label>
                <AvField id="amortization-entry-prepaymentDate" type="date" className="form-control" name="prepaymentDate" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionAmountLabel" for="amortization-entry-transactionAmount">
                  Transaction Amount
                </Label>
                <AvField id="amortization-entry-transactionAmount" type="text" name="transactionAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="amortizationDateLabel" for="amortization-entry-amortizationDate">
                  Amortization Date
                </Label>
                <AvField id="amortization-entry-amortizationDate" type="date" className="form-control" name="amortizationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="uploadTokenLabel" for="amortization-entry-uploadToken">
                  Upload Token
                </Label>
                <AvField id="amortization-entry-uploadToken" type="text" name="uploadToken" />
              </AvGroup>
              <AvGroup>
                <Label id="prepaymentDataIdLabel" for="amortization-entry-prepaymentDataId">
                  Prepayment Data Id
                </Label>
                <AvField id="amortization-entry-prepaymentDataId" type="string" className="form-control" name="prepaymentDataId" />
              </AvGroup>
              <AvGroup>
                <Label id="compilationTokenLabel" for="amortization-entry-compilationToken">
                  Compilation Token
                </Label>
                <AvField id="amortization-entry-compilationToken" type="text" name="compilationToken" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/amortization-entry" replace color="info">
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
  amortizationEntryEntity: storeState.amortizationEntry.entity,
  loading: storeState.amortizationEntry.loading,
  updating: storeState.amortizationEntry.updating,
  updateSuccess: storeState.amortizationEntry.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AmortizationEntryUpdate);
