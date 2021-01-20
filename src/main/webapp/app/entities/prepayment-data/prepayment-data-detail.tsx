import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prepayment-data.reducer';
import { IPrepaymentData } from 'app/shared/model/prepayment-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrepaymentDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepaymentDataDetail = (props: IPrepaymentDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prepaymentDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PrepaymentData [<b>{prepaymentDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{prepaymentDataEntity.accountName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepaymentDataEntity.description}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{prepaymentDataEntity.accountNumber}</dd>
          <dt>
            <span id="expenseAccountNumber">Expense Account Number</span>
          </dt>
          <dd>{prepaymentDataEntity.expenseAccountNumber}</dd>
          <dt>
            <span id="prepaymentNumber">Prepayment Number</span>
          </dt>
          <dd>{prepaymentDataEntity.prepaymentNumber}</dd>
          <dt>
            <span id="prepaymentDate">Prepayment Date</span>
          </dt>
          <dd>
            {prepaymentDataEntity.prepaymentDate ? (
              <TextFormat value={prepaymentDataEntity.prepaymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="prepaymentAmount">Prepayment Amount</span>
          </dt>
          <dd>{prepaymentDataEntity.prepaymentAmount}</dd>
          <dt>
            <span id="prepaymentPeriods">Prepayment Periods</span>
          </dt>
          <dd>{prepaymentDataEntity.prepaymentPeriods}</dd>
          <dt>
            <span id="uploadToken">Upload Token</span>
          </dt>
          <dd>{prepaymentDataEntity.uploadToken}</dd>
        </dl>
        <Button tag={Link} to="/prepayment-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-data/${prepaymentDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prepaymentData }: IRootState) => ({
  prepaymentDataEntity: prepaymentData.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepaymentDataDetail);
