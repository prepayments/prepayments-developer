import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prepayment-entry.reducer';
import { IPrepaymentEntry } from 'app/shared/model/prepayment-entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrepaymentEntryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepaymentEntryDetail = (props: IPrepaymentEntryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prepaymentEntryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PrepaymentEntry [<b>{prepaymentEntryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{prepaymentEntryEntity.accountName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepaymentEntryEntity.description}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{prepaymentEntryEntity.accountNumber}</dd>
          <dt>
            <span id="prepaymentNumber">Prepayment Number</span>
          </dt>
          <dd>{prepaymentEntryEntity.prepaymentNumber}</dd>
          <dt>
            <span id="prepaymentDate">Prepayment Date</span>
          </dt>
          <dd>
            {prepaymentEntryEntity.prepaymentDate ? (
              <TextFormat value={prepaymentEntryEntity.prepaymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transactionAmount">Transaction Amount</span>
          </dt>
          <dd>{prepaymentEntryEntity.transactionAmount}</dd>
          <dt>
            <span id="uploadToken">Upload Token</span>
          </dt>
          <dd>{prepaymentEntryEntity.uploadToken}</dd>
        </dl>
        <Button tag={Link} to="/prepayment-entry" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-entry/${prepaymentEntryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prepaymentEntry }: IRootState) => ({
  prepaymentEntryEntity: prepaymentEntry.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepaymentEntryDetail);
