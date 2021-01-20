import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrepsFileType, defaultValue } from 'app/shared/model/preps/preps-file-type.model';

export const ACTION_TYPES = {
  FETCH_PREPSFILETYPE_LIST: 'prepsFileType/FETCH_PREPSFILETYPE_LIST',
  FETCH_PREPSFILETYPE: 'prepsFileType/FETCH_PREPSFILETYPE',
  CREATE_PREPSFILETYPE: 'prepsFileType/CREATE_PREPSFILETYPE',
  UPDATE_PREPSFILETYPE: 'prepsFileType/UPDATE_PREPSFILETYPE',
  DELETE_PREPSFILETYPE: 'prepsFileType/DELETE_PREPSFILETYPE',
  SET_BLOB: 'prepsFileType/SET_BLOB',
  RESET: 'prepsFileType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrepsFileType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PrepsFileTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: PrepsFileTypeState = initialState, action): PrepsFileTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREPSFILETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREPSFILETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREPSFILETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PREPSFILETYPE):
    case REQUEST(ACTION_TYPES.DELETE_PREPSFILETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PREPSFILETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREPSFILETYPE):
    case FAILURE(ACTION_TYPES.CREATE_PREPSFILETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PREPSFILETYPE):
    case FAILURE(ACTION_TYPES.DELETE_PREPSFILETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSFILETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSFILETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREPSFILETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PREPSFILETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREPSFILETYPE):
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

const apiUrl = 'api/preps-file-types';

// Actions

export const getEntities: ICrudGetAllAction<IPrepsFileType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSFILETYPE_LIST,
    payload: axios.get<IPrepsFileType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPrepsFileType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSFILETYPE,
    payload: axios.get<IPrepsFileType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrepsFileType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREPSFILETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrepsFileType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREPSFILETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrepsFileType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREPSFILETYPE,
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
