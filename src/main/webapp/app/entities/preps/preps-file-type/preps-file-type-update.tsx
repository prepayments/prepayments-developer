import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './preps-file-type.reducer';
import { IPrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrepsFileTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrepsFileTypeUpdate = (props: IPrepsFileTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prepsFileTypeEntity, loading, updating } = props;

  const { fileTemplate, fileTemplateContentType } = prepsFileTypeEntity;

  const handleClose = () => {
    props.history.push('/preps-file-type' + props.location.search);
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
        ...prepsFileTypeEntity,
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
          <h2 id="prepaymentsDevApp.prepsPrepsFileType.home.createOrEditLabel">Create or edit a PrepsFileType</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prepsFileTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="preps-file-type-id">ID</Label>
                  <AvInput id="preps-file-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prepsFileTypeNameLabel" for="preps-file-type-prepsFileTypeName">
                  Preps File Type Name
                </Label>
                <AvField
                  id="preps-file-type-prepsFileTypeName"
                  type="text"
                  name="prepsFileTypeName"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prepsFileMediumTypeLabel" for="preps-file-type-prepsFileMediumType">
                  Preps File Medium Type
                </Label>
                <AvInput
                  id="preps-file-type-prepsFileMediumType"
                  type="select"
                  className="form-control"
                  name="prepsFileMediumType"
                  value={(!isNew && prepsFileTypeEntity.prepsFileMediumType) || 'EXCEL'}
                >
                  <option value="EXCEL">EXCEL</option>
                  <option value="EXCEL_XLS">EXCEL_XLS</option>
                  <option value="EXCEL_XLSX">EXCEL_XLSX</option>
                  <option value="EXCEL_XLSB">EXCEL_XLSB</option>
                  <option value="EXCEL_CSV">EXCEL_CSV</option>
                  <option value="EXCEL_XML">EXCEL_XML</option>
                  <option value="PDF">PDF</option>
                  <option value="POWERPOINT">POWERPOINT</option>
                  <option value="DOC">DOC</option>
                  <option value="TEXT">TEXT</option>
                  <option value="JSON">JSON</option>
                  <option value="HTML5">HTML5</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="preps-file-type-description">
                  Description
                </Label>
                <AvField id="preps-file-type-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="fileTemplateLabel" for="fileTemplate">
                    File Template
                  </Label>
                  <br />
                  {fileTemplate ? (
                    <div>
                      {fileTemplateContentType ? <a onClick={openFile(fileTemplateContentType, fileTemplate)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {fileTemplateContentType}, {byteSize(fileTemplate)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('fileTemplate')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_fileTemplate" type="file" onChange={onBlobChange(false, 'fileTemplate')} />
                  <AvInput type="hidden" name="fileTemplate" value={fileTemplate} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="prepsfileTypeLabel" for="preps-file-type-prepsfileType">
                  Prepsfile Type
                </Label>
                <AvInput
                  id="preps-file-type-prepsfileType"
                  type="select"
                  className="form-control"
                  name="prepsfileType"
                  value={(!isNew && prepsFileTypeEntity.prepsfileType) || 'CURRENCY_LIST'}
                >
                  <option value="CURRENCY_LIST">CURRENCY_LIST</option>
                  <option value="PREPAYMENT_DATA">PREPAYMENT_DATA</option>
                  <option value="PREPAYMENT_ENTRY">PREPAYMENT_ENTRY</option>
                  <option value="AMORTIZATION_ENTRY">AMORTIZATION_ENTRY</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="prepsfileDeleteProcessTypeLabel" for="preps-file-type-prepsfileDeleteProcessType">
                  Prepsfile Delete Process Type
                </Label>
                <AvInput
                  id="preps-file-type-prepsfileDeleteProcessType"
                  type="select"
                  className="form-control"
                  name="prepsfileDeleteProcessType"
                  value={(!isNew && prepsFileTypeEntity.prepsfileDeleteProcessType) || 'DELETE_PREPAYMENT_DATA'}
                >
                  <option value="DELETE_PREPAYMENT_DATA">DELETE_PREPAYMENT_DATA</option>
                  <option value="DELETE_PREPAYMENT_ENTRY">DELETE_PREPAYMENT_ENTRY</option>
                  <option value="DELETE_AMORTIZATION_ENTRY">DELETE_AMORTIZATION_ENTRY</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/preps-file-type" replace color="info">
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
  prepsFileTypeEntity: storeState.prepsFileType.entity,
  loading: storeState.prepsFileType.loading,
  updating: storeState.prepsFileType.updating,
  updateSuccess: storeState.prepsFileType.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PrepsFileTypeUpdate);
