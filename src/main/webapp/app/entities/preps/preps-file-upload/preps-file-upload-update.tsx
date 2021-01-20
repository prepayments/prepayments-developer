import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './preps-file-upload.reducer';
import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrepsFileUploadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepsFileUploadUpdate = (props: IPrepsFileUploadUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prepsFileUploadEntity, loading, updating } = props;

  const { dataFile, dataFileContentType } = prepsFileUploadEntity;

  const handleClose = () => {
    props.history.push('/preps-file-upload' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prepsFileUploadEntity,
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
          <h2 id="prepaymentsDevApp.prepsPrepsFileUpload.home.createOrEditLabel">Create or edit a PrepsFileUpload</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prepsFileUploadEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="preps-file-upload-id">ID</Label>
                  <AvInput id="preps-file-upload-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="preps-file-upload-description">
                  Description
                </Label>
                <AvField
                  id="preps-file-upload-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fileNameLabel" for="preps-file-upload-fileName">
                  File Name
                </Label>
                <AvField
                  id="preps-file-upload-fileName"
                  type="text"
                  name="fileName"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="periodFromLabel" for="preps-file-upload-periodFrom">
                  Period From
                </Label>
                <AvField id="preps-file-upload-periodFrom" type="date" className="form-control" name="periodFrom" />
              </AvGroup>
              <AvGroup>
                <Label id="periodToLabel" for="preps-file-upload-periodTo">
                  Period To
                </Label>
                <AvField id="preps-file-upload-periodTo" type="date" className="form-control" name="periodTo" />
              </AvGroup>
              <AvGroup>
                <Label id="prepsFileTypeIdLabel" for="preps-file-upload-prepsFileTypeId">
                  Preps File Type Id
                </Label>
                <AvField
                  id="preps-file-upload-prepsFileTypeId"
                  type="string"
                  className="form-control"
                  name="prepsFileTypeId"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="dataFileLabel" for="dataFile">
                    Data File
                  </Label>
                  <br />
                  {dataFile ? (
                    <div>
                      {dataFileContentType ? <a onClick={openFile(dataFileContentType, dataFile)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {dataFileContentType}, {byteSize(dataFile)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('dataFile')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_dataFile" type="file" onChange={onBlobChange(false, 'dataFile')} />
                  <AvInput
                    type="hidden"
                    name="dataFile"
                    value={dataFile}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="uploadSuccessfulLabel">
                  <AvInput id="preps-file-upload-uploadSuccessful" type="checkbox" className="form-check-input" name="uploadSuccessful" />
                  Upload Successful
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="uploadProcessedLabel">
                  <AvInput id="preps-file-upload-uploadProcessed" type="checkbox" className="form-check-input" name="uploadProcessed" />
                  Upload Processed
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="uploadTokenLabel" for="preps-file-upload-uploadToken">
                  Upload Token
                </Label>
                <AvField id="preps-file-upload-uploadToken" type="text" name="uploadToken" validate={{}} />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/preps-file-upload" replace color="info">
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
  prepsFileUploadEntity: storeState.prepsFileUpload.entity,
  loading: storeState.prepsFileUpload.loading,
  updating: storeState.prepsFileUpload.updating,
  updateSuccess: storeState.prepsFileUpload.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepsFileUploadUpdate);
