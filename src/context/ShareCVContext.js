import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const ShareCVContext = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'CREATE':
      return { ...state, shareCV: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const createShareCV = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/share-cv', formValues)
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

const addError = dispatch => error => {
  dispatch({ type: 'ADD_ERROR', payload: error })
}

const clearShareCVErrors = dispatch => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
  return
}

export const { Context, Provider } = createDataContext(
  ShareCVContext,
  { createShareCV, clearShareCVErrors, addError },
  // Initial state
  { shareCV: null, error: null, loading: null }
)
