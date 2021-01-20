import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrepsMessageToken, defaultValue } from 'app/shared/model/preps/preps-message-token.model';

export const ACTION_TYPES = {
  FETCH_PREPSMESSAGETOKEN_LIST: 'prepsMessageToken/FETCH_PREPSMESSAGETOKEN_LIST',
  FETCH_PREPSMESSAGETOKEN: 'prepsMessageToken/FETCH_PREPSMESSAGETOKEN',
  CREATE_PREPSMESSAGETOKEN: 'prepsMessageToken/CREATE_PREPSMESSAGETOKEN',
  UPDATE_PREPSMESSAGETOKEN: 'prepsMessageToken/UPDATE_PREPSMESSAGETOKEN',
  DELETE_PREPSMESSAGETOKEN: 'prepsMessageToken/DELETE_PREPSMESSAGETOKEN',
  RESET: 'prepsMessageToken/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrepsMessageToken>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PrepsMessageTokenState = Readonly<typeof initialState>;

// Reducer

export default (state: PrepsMessageTokenState = initialState, action): PrepsMessageTokenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREPSMESSAGETOKEN):
    case REQUEST(ACTION_TYPES.UPDATE_PREPSMESSAGETOKEN):
    case REQUEST(ACTION_TYPES.DELETE_PREPSMESSAGETOKEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN):
    case FAILURE(ACTION_TYPES.CREATE_PREPSMESSAGETOKEN):
    case FAILURE(ACTION_TYPES.UPDATE_PREPSMESSAGETOKEN):
    case FAILURE(ACTION_TYPES.DELETE_PREPSMESSAGETOKEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPSMESSAGETOKEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREPSMESSAGETOKEN):
    case SUCCESS(ACTION_TYPES.UPDATE_PREPSMESSAGETOKEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREPSMESSAGETOKEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/preps-message-tokens';

// Actions

export const getEntities: ICrudGetAllAction<IPrepsMessageToken> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSMESSAGETOKEN_LIST,
    payload: axios.get<IPrepsMessageToken>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPrepsMessageToken> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREPSMESSAGETOKEN,
    payload: axios.get<IPrepsMessageToken>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrepsMessageToken> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREPSMESSAGETOKEN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrepsMessageToken> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREPSMESSAGETOKEN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrepsMessageToken> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREPSMESSAGETOKEN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
