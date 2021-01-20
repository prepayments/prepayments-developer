import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAmortizationEntry, defaultValue } from 'app/shared/model/amortization-entry.model';

export const ACTION_TYPES = {
  SEARCH_AMORTIZATIONENTRIES: 'amortizationEntry/SEARCH_AMORTIZATIONENTRIES',
  FETCH_AMORTIZATIONENTRY_LIST: 'amortizationEntry/FETCH_AMORTIZATIONENTRY_LIST',
  FETCH_AMORTIZATIONENTRY: 'amortizationEntry/FETCH_AMORTIZATIONENTRY',
  CREATE_AMORTIZATIONENTRY: 'amortizationEntry/CREATE_AMORTIZATIONENTRY',
  UPDATE_AMORTIZATIONENTRY: 'amortizationEntry/UPDATE_AMORTIZATIONENTRY',
  DELETE_AMORTIZATIONENTRY: 'amortizationEntry/DELETE_AMORTIZATIONENTRY',
  RESET: 'amortizationEntry/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAmortizationEntry>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AmortizationEntryState = Readonly<typeof initialState>;

// Reducer

export default (state: AmortizationEntryState = initialState, action): AmortizationEntryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_AMORTIZATIONENTRIES):
    case REQUEST(ACTION_TYPES.FETCH_AMORTIZATIONENTRY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AMORTIZATIONENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AMORTIZATIONENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_AMORTIZATIONENTRY):
    case REQUEST(ACTION_TYPES.DELETE_AMORTIZATIONENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_AMORTIZATIONENTRIES):
    case FAILURE(ACTION_TYPES.FETCH_AMORTIZATIONENTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AMORTIZATIONENTRY):
    case FAILURE(ACTION_TYPES.CREATE_AMORTIZATIONENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_AMORTIZATIONENTRY):
    case FAILURE(ACTION_TYPES.DELETE_AMORTIZATIONENTRY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_AMORTIZATIONENTRIES):
    case SUCCESS(ACTION_TYPES.FETCH_AMORTIZATIONENTRY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_AMORTIZATIONENTRY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AMORTIZATIONENTRY):
    case SUCCESS(ACTION_TYPES.UPDATE_AMORTIZATIONENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AMORTIZATIONENTRY):
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

const apiUrl = 'api/amortization-entries';
const apiSearchUrl = 'api/_search/amortization-entries';

// Actions

export const getSearchEntities: ICrudSearchAction<IAmortizationEntry> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_AMORTIZATIONENTRIES,
  payload: axios.get<IAmortizationEntry>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IAmortizationEntry> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AMORTIZATIONENTRY_LIST,
    payload: axios.get<IAmortizationEntry>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAmortizationEntry> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AMORTIZATIONENTRY,
    payload: axios.get<IAmortizationEntry>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAmortizationEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AMORTIZATIONENTRY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAmortizationEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AMORTIZATIONENTRY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAmortizationEntry> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AMORTIZATIONENTRY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
