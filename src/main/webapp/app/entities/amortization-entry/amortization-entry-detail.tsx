import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './amortization-entry.reducer';
import { IAmortizationEntry } from 'app/shared/model/amortization-entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAmortizationEntryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AmortizationEntryDetail = (props: IAmortizationEntryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { amortizationEntryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          AmortizationEntry [<b>{amortizationEntryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{amortizationEntryEntity.accountName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{amortizationEntryEntity.description}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{amortizationEntryEntity.accountNumber}</dd>
          <dt>
            <span id="expenseAccountNumber">Expense Account Number</span>
          </dt>
          <dd>{amortizationEntryEntity.expenseAccountNumber}</dd>
          <dt>
            <span id="prepaymentNumber">Prepayment Number</span>
          </dt>
          <dd>{amortizationEntryEntity.prepaymentNumber}</dd>
          <dt>
            <span id="prepaymentDate">Prepayment Date</span>
          </dt>
          <dd>
            {amortizationEntryEntity.prepaymentDate ? (
              <TextFormat value={amortizationEntryEntity.prepaymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transactionAmount">Transaction Amount</span>
          </dt>
          <dd>{amortizationEntryEntity.transactionAmount}</dd>
          <dt>
            <span id="amortizationDate">Amortization Date</span>
          </dt>
          <dd>
            {amortizationEntryEntity.amortizationDate ? (
              <TextFormat value={amortizationEntryEntity.amortizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="uploadToken">Upload Token</span>
          </dt>
          <dd>{amortizationEntryEntity.uploadToken}</dd>
          <dt>
            <span id="prepaymentDataId">Prepayment Data Id</span>
          </dt>
          <dd>{amortizationEntryEntity.prepaymentDataId}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{amortizationEntryEntity.compilationToken}</dd>
        </dl>
        <Button tag={Link} to="/amortization-entry" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/amortization-entry/${amortizationEntryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ amortizationEntry }: IRootState) => ({
  amortizationEntryEntity: amortizationEntry.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AmortizationEntryDetail);
