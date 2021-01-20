import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompilationRequest, defaultValue } from 'app/shared/model/compilation-request.model';

export const ACTION_TYPES = {
  SEARCH_COMPILATIONREQUESTS: 'compilationRequest/SEARCH_COMPILATIONREQUESTS',
  FETCH_COMPILATIONREQUEST_LIST: 'compilationRequest/FETCH_COMPILATIONREQUEST_LIST',
  FETCH_COMPILATIONREQUEST: 'compilationRequest/FETCH_COMPILATIONREQUEST',
  CREATE_COMPILATIONREQUEST: 'compilationRequest/CREATE_COMPILATIONREQUEST',
  UPDATE_COMPILATIONREQUEST: 'compilationRequest/UPDATE_COMPILATIONREQUEST',
  DELETE_COMPILATIONREQUEST: 'compilationRequest/DELETE_COMPILATIONREQUEST',
  RESET: 'compilationRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompilationRequest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CompilationRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: CompilationRequestState = initialState, action): CompilationRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COMPILATIONREQUESTS):
    case REQUEST(ACTION_TYPES.FETCH_COMPILATIONREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPILATIONREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPILATIONREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_COMPILATIONREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_COMPILATIONREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_COMPILATIONREQUESTS):
    case FAILURE(ACTION_TYPES.FETCH_COMPILATIONREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPILATIONREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_COMPILATIONREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_COMPILATIONREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_COMPILATIONREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COMPILATIONREQUESTS):
    case SUCCESS(ACTION_TYPES.FETCH_COMPILATIONREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPILATIONREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPILATIONREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPILATIONREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPILATIONREQUEST):
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

const apiUrl = 'api/compilation-requests';
const apiSearchUrl = 'api/_search/compilation-requests';

// Actions

export const getSearchEntities: ICrudSearchAction<ICompilationRequest> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_COMPILATIONREQUESTS,
  payload: axios.get<ICompilationRequest>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<ICompilationRequest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMPILATIONREQUEST_LIST,
    payload: axios.get<ICompilationRequest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICompilationRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPILATIONREQUEST,
    payload: axios.get<ICompilationRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompilationRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPILATIONREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompilationRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPILATIONREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompilationRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPILATIONREQUEST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
