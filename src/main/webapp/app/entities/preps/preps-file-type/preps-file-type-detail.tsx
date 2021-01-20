import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './preps-file-type.reducer';
import { IPrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrepsFileTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepsFileTypeDetail = (props: IPrepsFileTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prepsFileTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PrepsFileType [<b>{prepsFileTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="prepsFileTypeName">Preps File Type Name</span>
          </dt>
          <dd>{prepsFileTypeEntity.prepsFileTypeName}</dd>
          <dt>
            <span id="prepsFileMediumType">Preps File Medium Type</span>
          </dt>
          <dd>{prepsFileTypeEntity.prepsFileMediumType}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepsFileTypeEntity.description}</dd>
          <dt>
            <span id="fileTemplate">File Template</span>
          </dt>
          <dd>
            {prepsFileTypeEntity.fileTemplate ? (
              <div>
                {prepsFileTypeEntity.fileTemplateContentType ? (
                  <a onClick={openFile(prepsFileTypeEntity.fileTemplateContentType, prepsFileTypeEntity.fileTemplate)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {prepsFileTypeEntity.fileTemplateContentType}, {byteSize(prepsFileTypeEntity.fileTemplate)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="prepsfileType">Prepsfile Type</span>
          </dt>
          <dd>{prepsFileTypeEntity.prepsfileType}</dd>
          <dt>
            <span id="prepsfileDeleteProcessType">Prepsfile Delete Process Type</span>
          </dt>
          <dd>{prepsFileTypeEntity.prepsfileDeleteProcessType}</dd>
        </dl>
        <Button tag={Link} to="/preps-file-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/preps-file-type/${prepsFileTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prepsFileType }: IRootState) => ({
  prepsFileTypeEntity: prepsFileType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepsFileTypeDetail);
