import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrepsFileUpload, defaultValue } from 'app/shared/model/preps/preps-file-upload.model';

export const ACTION_TYPES = {
  FETCH_PREPSFILEUPLOAD_LIST: 'prepsFileUpload/FETCH_PREPSFILEUPLOAD_LIST',
  FETCH_PREPSFILEUPLOAD: 'prepsFileUpload/FETCH_PREPSFILEUPLOAD',
  CREATE_PREPSFILEUPLOAD: 'prepsFileUpload/CREATE_PREPSFILEUPLOAD',
  UPDATE_PREPSFILEUPLOAD: 'prepsFileUpload/UPDATE_PREPSFILEUPLOAD',
  DELETE_PREPSFILEUPLOAD: 'prepsFileUpload/DELETE_PREPSFILEUPLOAD',
  SET_BLOB: 'prepsFileUpload/SET_BLOB',
  RESET: 'prepsFileUpload/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrepsFileUpload>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PrepsFileUploadState = Readonly<typeof initialState>;

// Reducer

export default (state: PrepsFileUploadState = initialState, action): PrepsFileUploadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREPSFILEUPLOAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREPSFILEUPLOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREPSFILEUPLOAD):
    case REQUEST(ACTION_TYPES.UPDATE_PREPSFILEUPLOAD):
    case REQUEST(ACTION_TYPES.DELETE_PREPSFILEUPLOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PREPSFILEUPLOAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREPSFILEUPLOAD):
    case FAILURE(ACTION_TYPES.CREATE_PREPSFILEUPLOAD):
    case FAILURE(ACTION_TYPES.UPDATE_PREPSFILEUPLOAD):
    case FAILURE(ACTION_TYPES.DELETE_PREPSFILEUPLOAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSFILEUPLOAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSFILEUPLOAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREPSFILEUPLOAD):
    case SUCCESS(ACTION_TYPES.UPDATE_PREPSFILEUPLOAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREPSFILEUPLOAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/app/file-uploads';

// Actions

export const getEntities: ICrudGetAllAction<IPrepsFileUpload> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSFILEUPLOAD_LIST,
    payload: axios.get<IPrepsFileUpload>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPrepsFileUpload> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSFILEUPLOAD,
    payload: axios.get<IPrepsFileUpload>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrepsFileUpload> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREPSFILEUPLOAD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrepsFileUpload> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREPSFILEUPLOAD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrepsFileUpload> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREPSFILEUPLOAD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
