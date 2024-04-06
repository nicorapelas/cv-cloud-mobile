import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const AffiliateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: action.payload }
    case 'FETCH_AFFILIATE_INFO':
      return { ...state, affiliateInfo: action.payload }
    case 'FETCH_AFFILIATES_INTROS':
      return { ...state, affiliateIntros: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchAffiliateInfo = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/affiliate/info')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'FETCH_AFFILIATE_INFO', payload: response.data[0] })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearErrors = dispatch => async () => {
  dispatch({ type: 'CLEAR_ERRORS', payload: null })
  return
}

const fetchAffiliatesIntros = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/affiliate/intros')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'FETCH_AFFILIATES_INTROS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

export const { Context, Provider } = createDataContext(
  AffiliateReducer,
  {
    clearErrors,
    fetchAffiliateInfo,
    fetchAffiliatesIntros
  },
  // Initial state
  { affiliateInfo: null, affiliateIntros: null, loading: null, error: null }
)
