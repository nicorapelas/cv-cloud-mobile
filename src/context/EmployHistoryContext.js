import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const EmployHistoryReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_SAMPLE':
      return { ...state, employHistorySample: action.payload }
    case 'FETCH_STATUS':
      return {
        ...state,
        employHistoryStatus: action.payload,
        loading: false
      }
    case 'FETCH_EMPLOY_HISTORYS':
      return { ...state, employHistorys: action.payload, loading: false }
    case 'CREATE':
      return { ...state, employHistory: action.payload, loading: false }
    case 'EDIT':
      return { ...state, [action.payload._id]: action.payload, loading: false }
    case 'DELETE':
      return _.omit(state, action.payload)
    default:
      return state
  }
}

// Actions
const fetchEmployHistorySample = dispatch => async () => {
  try {
    const response = await ngrokApi.get('/api/employment-history/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchEmployHistoryStatus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/employment-history/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchEmployHistorys = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('api/employment-history')
    dispatch({ type: 'FETCH_EMPLOY_HISTORYS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createEmployHistory = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/employment-history', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const editEmployHistory = dispatch => async (id, formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/employment-history/${id}`,
      formValues
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'EDIT', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const deleteEmployHistory = dispatch => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/employment-history/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const addError = dispatch => error => {
  dispatch({ type: 'ADD_ERROR', payload: error })
}

const clearEmployHistoryErrors = dispatch => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
  return
}

export const { Context, Provider } = createDataContext(
  EmployHistoryReducer,
  {
    fetchEmployHistorySample,
    fetchEmployHistoryStatus,
    fetchEmployHistorys,
    createEmployHistory,
    editEmployHistory,
    deleteEmployHistory,
    addError,
    clearEmployHistoryErrors
  },
  // Initial state
  {
    employHistory: null,
    employHistorys: null,
    employHistorySample: null,
    employHistoryStatus: null,
    loading: null
  }
)
