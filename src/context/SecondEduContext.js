import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const SeconEduReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_SAMPLE':
      return { ...state, secondEduSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, secondEduStatus: action.payload, loading: false }
    case 'FETCH_SECOND_EDUS':
      return { ...state, secondEdus: action.payload, loading: false }
    case 'CREATE':
      return { ...state, secondEdu: action.payload, loading: false }
    case 'EDIT':
      return { ...state, [action.payload._id]: action.payload, loading: false }
    case 'DELETE':
      return _.omit(state, action.payload)
    default:
      return state
  }
}

// Actions
const fetchSecondEduSample = dispatch => async () => {
  try {
    const response = await ngrokApi.get('/api/secondary-education/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchSecondEduStatus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/secondary-education/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchSecondEdus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/secondary-education')
    dispatch({ type: 'FETCH_SECOND_EDUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createSecondEdu = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/secondary-education', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const editSecondEdu = dispatch => async (id, formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/secondary-education/${id}`,
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

const deleteSecondEdu = dispatch => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/secondary-education/${id}`)
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

const clearSecondEduErrors = dispatch => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
}

export const { Context, Provider } = createDataContext(
  SeconEduReducer,
  {
    fetchSecondEduSample,
    fetchSecondEduStatus,
    fetchSecondEdus,
    createSecondEdu,
    editSecondEdu,
    deleteSecondEdu,
    addError,
    clearSecondEduErrors
  },
  // Initial state
  {
    secondEdu: null,
    secondEdus: null,
    secondEduSample: null,
    secondEduStatus: null,
    loading: null,
    error: null
  }
)
