import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './preps-message-token.reducer';
import { IPrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrepsMessageTokenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepsMessageTokenDetail = (props: IPrepsMessageTokenDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prepsMessageTokenEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PrepsMessageToken [<b>{prepsMessageTokenEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepsMessageTokenEntity.description}</dd>
          <dt>
            <span id="timeSent">Time Sent</span>
          </dt>
          <dd>{prepsMessageTokenEntity.timeSent}</dd>
          <dt>
            <span id="tokenValue">Token Value</span>
          </dt>
          <dd>{prepsMessageTokenEntity.tokenValue}</dd>
          <dt>
            <span id="received">Received</span>
          </dt>
          <dd>{prepsMessageTokenEntity.received ? 'true' : 'false'}</dd>
          <dt>
            <span id="actioned">Actioned</span>
          </dt>
          <dd>{prepsMessageTokenEntity.actioned ? 'true' : 'false'}</dd>
          <dt>
            <span id="contentFullyEnqueued">Content Fully Enqueued</span>
          </dt>
          <dd>{prepsMessageTokenEntity.contentFullyEnqueued ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/preps-message-token" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/preps-message-token/${prepsMessageTokenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prepsMessageToken }: IRootState) => ({
  prepsMessageTokenEntity: prepsMessageToken.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepsMessageTokenDetail);
