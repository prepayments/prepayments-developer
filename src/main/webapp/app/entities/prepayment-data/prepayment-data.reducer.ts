import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrepaymentData, defaultValue } from 'app/shared/model/prepayment-data.model';

export const ACTION_TYPES = {
  SEARCH_PREPAYMENTDATA: 'prepaymentData/SEARCH_PREPAYMENTDATA',
  FETCH_PREPAYMENTDATA_LIST: 'prepaymentData/FETCH_PREPAYMENTDATA_LIST',
  FETCH_PREPAYMENTDATA: 'prepaymentData/FETCH_PREPAYMENTDATA',
  CREATE_PREPAYMENTDATA: 'prepaymentData/CREATE_PREPAYMENTDATA',
  UPDATE_PREPAYMENTDATA: 'prepaymentData/UPDATE_PREPAYMENTDATA',
  DELETE_PREPAYMENTDATA: 'prepaymentData/DELETE_PREPAYMENTDATA',
  RESET: 'prepaymentData/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrepaymentData>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PrepaymentDataState = Readonly<typeof initialState>;

// Reducer

export default (state: PrepaymentDataState = initialState, action): PrepaymentDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PREPAYMENTDATA):
    case REQUEST(ACTION_TYPES.FETCH_PREPAYMENTDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREPAYMENTDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREPAYMENTDATA):
    case REQUEST(ACTION_TYPES.UPDATE_PREPAYMENTDATA):
    case REQUEST(ACTION_TYPES.DELETE_PREPAYMENTDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PREPAYMENTDATA):
    case FAILURE(ACTION_TYPES.FETCH_PREPAYMENTDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREPAYMENTDATA):
    case FAILURE(ACTION_TYPES.CREATE_PREPAYMENTDATA):
    case FAILURE(ACTION_TYPES.UPDATE_PREPAYMENTDATA):
    case FAILURE(ACTION_TYPES.DELETE_PREPAYMENTDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PREPAYMENTDATA):
    case SUCCESS(ACTION_TYPES.FETCH_PREPAYMENTDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPAYMENTDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREPAYMENTDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_PREPAYMENTDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREPAYMENTDATA):
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

const apiUrl = 'api/prepayment-data';
const apiSearchUrl = 'api/_search/prepayment-data';

// Actions

export const getSearchEntities: ICrudSearchAction<IPrepaymentData> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PREPAYMENTDATA,
  payload: axios.get<IPrepaymentData>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IPrepaymentData> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREPAYMENTDATA_LIST,
    payload: axios.get<IPrepaymentData>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPrepaymentData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREPAYMENTDATA,
    payload: axios.get<IPrepaymentData>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrepaymentData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREPAYMENTDATA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrepaymentData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREPAYMENTDATA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrepaymentData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREPAYMENTDATA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
