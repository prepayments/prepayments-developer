import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './preps-file-upload.reducer';
import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IPrepsFileUploadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PrepsFileUpload = (props: IPrepsFileUploadProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { prepsFileUploadList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="preps-file-upload-heading">
        Preps File Uploads
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Preps File Upload
        </Link>
      </h2>
      <div className="table-responsive">
        {prepsFileUploadList && prepsFileUploadList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileName')}>
                  File Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodFrom')}>
                  Period From <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodTo')}>
                  Period To <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepsFileTypeId')}>
                  Preps File Type Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataFile')}>
                  Data File <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadSuccessful')}>
                  Upload Successful <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadProcessed')}>
                  Upload Processed <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadToken')}>
                  Upload Token <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prepsFileUploadList.map((prepsFileUpload, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prepsFileUpload.id}`} color="link" size="sm">
                      {prepsFileUpload.id}
                    </Button>
                  </td>
                  <td>{prepsFileUpload.description}</td>
                  <td>{prepsFileUpload.fileName}</td>
                  <td>
                    {prepsFileUpload.periodFrom ? (
                      <TextFormat type="date" value={prepsFileUpload.periodFrom} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {prepsFileUpload.periodTo ? (
                      <TextFormat type="date" value={prepsFileUpload.periodTo} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{prepsFileUpload.prepsFileTypeId}</td>
                  <td>
                    {prepsFileUpload.dataFile ? (
                      <div>
                        {prepsFileUpload.dataFileContentType ? (
                          <a onClick={openFile(prepsFileUpload.dataFileContentType, prepsFileUpload.dataFile)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {prepsFileUpload.dataFileContentType}, {byteSize(prepsFileUpload.dataFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{prepsFileUpload.uploadSuccessful ? 'true' : 'false'}</td>
                  <td>{prepsFileUpload.uploadProcessed ? 'true' : 'false'}</td>
                  <td>{prepsFileUpload.uploadToken}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prepsFileUpload.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prepsFileUpload.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prepsFileUpload.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Preps File Uploads found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={prepsFileUploadList && prepsFileUploadList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ prepsFileUpload }: IRootState) => ({
  prepsFileUploadList: prepsFileUpload.entities,
  loading: prepsFileUpload.loading,
  totalItems: prepsFileUpload.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrepsFileUpload);
