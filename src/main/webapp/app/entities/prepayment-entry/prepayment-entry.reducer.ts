import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrepaymentEntry, defaultValue } from 'app/shared/model/prepayment-entry.model';

export const ACTION_TYPES = {
  SEARCH_PREPAYMENTENTRIES: 'prepaymentEntry/SEARCH_PREPAYMENTENTRIES',
  FETCH_PREPAYMENTENTRY_LIST: 'prepaymentEntry/FETCH_PREPAYMENTENTRY_LIST',
  FETCH_PREPAYMENTENTRY: 'prepaymentEntry/FETCH_PREPAYMENTENTRY',
  CREATE_PREPAYMENTENTRY: 'prepaymentEntry/CREATE_PREPAYMENTENTRY',
  UPDATE_PREPAYMENTENTRY: 'prepaymentEntry/UPDATE_PREPAYMENTENTRY',
  DELETE_PREPAYMENTENTRY: 'prepaymentEntry/DELETE_PREPAYMENTENTRY',
  RESET: 'prepaymentEntry/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrepaymentEntry>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PrepaymentEntryState = Readonly<typeof initialState>;

// Reducer

export default (state: PrepaymentEntryState = initialState, action): PrepaymentEntryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PREPAYMENTENTRIES):
    case REQUEST(ACTION_TYPES.FETCH_PREPAYMENTENTRY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREPAYMENTENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PREPAYMENTENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_PREPAYMENTENTRY):
    case REQUEST(ACTION_TYPES.DELETE_PREPAYMENTENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PREPAYMENTENTRIES):
    case FAILURE(ACTION_TYPES.FETCH_PREPAYMENTENTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREPAYMENTENTRY):
    case FAILURE(ACTION_TYPES.CREATE_PREPAYMENTENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_PREPAYMENTENTRY):
    case FAILURE(ACTION_TYPES.DELETE_PREPAYMENTENTRY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PREPAYMENTENTRIES):
    case SUCCESS(ACTION_TYPES.FETCH_PREPAYMENTENTRY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREPAYMENTENTRY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREPAYMENTENTRY):
    case SUCCESS(ACTION_TYPES.UPDATE_PREPAYMENTENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREPAYMENTENTRY):
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

const apiUrl = 'api/prepayment-entries';
const apiSearchUrl = 'api/_search/prepayment-entries';

// Actions

export const getSearchEntities: ICrudSearchAction<IPrepaymentEntry> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PREPAYMENTENTRIES,
  payload: axios.get<IPrepaymentEntry>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IPrepaymentEntry> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PREPAYMENTENTRY_LIST,
    payload: axios.get<IPrepaymentEntry>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPrepaymentEntry> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREPAYMENTENTRY,
    payload: axios.get<IPrepaymentEntry>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrepaymentEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREPAYMENTENTRY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrepaymentEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREPAYMENTENTRY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrepaymentEntry> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREPAYMENTENTRY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
