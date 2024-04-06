import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const PersonalSummaryReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: action.payload }
    case 'FETCH_SAMPLE':
      return { ...state, personalSummarySample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, personalSummaryStatus: action.payload, loading: false }
    case 'FETCH_ALL':
      return { ...state, personalSummary: action.payload, loading: false }
    case 'CREATE':
      return { ...state, personalSummary: action.payload, loading: false }
    case 'DELETE':
      return _.omit(state, action.payload)
    default:
      return state
  }
}

// Actions
const fetchPersonalSummarySample = dispatch => async () => {
  try {
    const response = await ngrokApi.get('/api/personal-summary/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchPersonalSummaryStatus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/personal-summary/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchPersonalSummary = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/personal-summary')
    dispatch({ type: 'FETCH_ALL', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createPersonalSummary = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/personal-summary', formValues)
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

const editPersonalSummary = dispatch => async (id, formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/personal-summary/${id}`,
      formValues
    )
    dispatch({ type: 'EDIT', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const deletePersonalSummary = dispatch => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/personal-summary/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const clearPersonalSummaryErrors = dispatch => async () => {
  dispatch({ type: 'CLEAR_ERRORS', payload: null })
  return
}

export const { Context, Provider } = createDataContext(
  PersonalSummaryReducer,
  {
    fetchPersonalSummarySample,
    fetchPersonalSummaryStatus,
    fetchPersonalSummary,
    createPersonalSummary,
    editPersonalSummary,
    deletePersonalSummary,
    clearPersonalSummaryErrors
  },
  // Initial state
  {
    personalSummary: null,
    personalSummarySample: null,
    personalSummaryStatus: null,
    loading: null,
    error: null
  }
)
