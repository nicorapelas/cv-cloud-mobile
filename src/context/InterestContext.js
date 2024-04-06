import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const InterestReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: action.payload }
    case 'FETCH_SAMPLE':
      return { ...state, interestSample: action.payload }
    case 'FETCH_STATUS':
      return {
        ...state,
        interestStatus: action.payload,
        loading: false
      }
    case 'FETCH_ALL':
      return { ...state, interests: action.payload, loading: false }
    case 'CREATE':
      return { ...state, interest: action.payload, loading: false }
    case 'DELETE':
      return _.omit(state, action.payload)
    default:
      return state
  }
}

// Actions
const fetchInterestSample = dispatch => async () => {
  try {
    const response = await ngrokApi.get('/api/interest/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchInterestStatus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/interest/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchInterests = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/interest')
    dispatch({ type: 'FETCH_ALL', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createInterest = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/interest', formValues)
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

const editInterest = dispatch => async (id, formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/interest/${id}`, formValues)
    dispatch({ type: 'EDIT', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const deleteInterest = dispatch => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/interest/${id}`)
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
  return
}

const clearInterestErrors = dispatch => async () => {
  dispatch({ type: 'CLEAR_ERRORS', payload: null })
  return
}

export const { Context, Provider } = createDataContext(
  InterestReducer,
  {
    fetchInterestSample,
    fetchInterestStatus,
    fetchInterests,
    createInterest,
    editInterest,
    deleteInterest,
    addError,
    clearInterestErrors
  },
  // Initial state
  {
    interest: null,
    interests: null,
    interestSample: null,
    interestStatus: null,
    loading: null,
    error: null
  }
)
