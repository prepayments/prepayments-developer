import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './compilation-request.reducer';
import { ICompilationRequest } from 'app/shared/model/compilation-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompilationRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompilationRequestDetail = (props: ICompilationRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { compilationRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          CompilationRequest [<b>{compilationRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{compilationRequestEntity.description}</dd>
          <dt>
            <span id="fileUploadId">File Upload Id</span>
          </dt>
          <dd>{compilationRequestEntity.fileUploadId}</dd>
          <dt>
            <span id="compilationStatus">Compilation Status</span>
          </dt>
          <dd>{compilationRequestEntity.compilationStatus}</dd>
          <dt>
            <span id="compilationType">Compilation Type</span>
          </dt>
          <dd>{compilationRequestEntity.compilationType}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{compilationRequestEntity.compilationToken}</dd>
        </dl>
        <Button tag={Link} to="/compilation-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/compilation-request/${compilationRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ compilationRequest }: IRootState) => ({
  compilationRequestEntity: compilationRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompilationRequestDetail);
