import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './preps-file-upload.reducer';
import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrepsFileUploadDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepsFileUploadDetail = (props: IPrepsFileUploadDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prepsFileUploadEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PrepsFileUpload [<b>{prepsFileUploadEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepsFileUploadEntity.description}</dd>
          <dt>
            <span id="fileName">File Name</span>
          </dt>
          <dd>{prepsFileUploadEntity.fileName}</dd>
          <dt>
            <span id="periodFrom">Period From</span>
          </dt>
          <dd>
            {prepsFileUploadEntity.periodFrom ? (
              <TextFormat value={prepsFileUploadEntity.periodFrom} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="periodTo">Period To</span>
          </dt>
          <dd>
            {prepsFileUploadEntity.periodTo ? (
              <TextFormat value={prepsFileUploadEntity.periodTo} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="prepsFileTypeId">Preps File Type Id</span>
          </dt>
          <dd>{prepsFileUploadEntity.prepsFileTypeId}</dd>
          <dt>
            <span id="dataFile">Data File</span>
          </dt>
          <dd>
            {prepsFileUploadEntity.dataFile ? (
              <div>
                {prepsFileUploadEntity.dataFileContentType ? (
                  <a onClick={openFile(prepsFileUploadEntity.dataFileContentType, prepsFileUploadEntity.dataFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {prepsFileUploadEntity.dataFileContentType}, {byteSize(prepsFileUploadEntity.dataFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="uploadSuccessful">Upload Successful</span>
          </dt>
          <dd>{prepsFileUploadEntity.uploadSuccessful ? 'true' : 'false'}</dd>
          <dt>
            <span id="uploadProcessed">Upload Processed</span>
          </dt>
          <dd>{prepsFileUploadEntity.uploadProcessed ? 'true' : 'false'}</dd>
          <dt>
            <span id="uploadToken">Upload Token</span>
          </dt>
          <dd>{prepsFileUploadEntity.uploadToken}</dd>
        </dl>
        <Button tag={Link} to="/preps-file-upload" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/preps-file-upload/${prepsFileUploadEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prepsFileUpload }: IRootState) => ({
  prepsFileUploadEntity: prepsFileUpload.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepsFileUploadDetail);
