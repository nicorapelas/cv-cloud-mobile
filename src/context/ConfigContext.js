import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const ConfigReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'FETCH_CONFIG_INFO':
      return { ...state, configData: action.payload, loading: false }
    case 'CLEAR_CONFIG_DATA':
      return { ...state, configData: action.payload }
    default:
      return state
  }
}

// Actions
const fetchConfigInfo = dispatch => async info => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/config/info', info)
    dispatch({ type: 'FETCH_CONFIG_INFO', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearConfigData = dispatch => () => {
  dispatch({ type: 'CLEAR_CONFIG_DATA', payload: null })
}

export const { Context, Provider } = createDataContext(
  ConfigReducer,
  {
    fetchConfigInfo,
    clearConfigData
  },
  // Initial state
  {
    loading: false,
    configData: ''
  }
)
