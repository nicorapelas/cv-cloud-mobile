import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const BurgerMenuReducer = (state, action) => {
  switch (action.type) {
    case 'BURGER_MENU_VISIBLE':
      return { ...state, burgerMenuVisible: action.payload }
    case 'SET_USERS_INFO_CONTENT_VISIBLE':
      return { ...state, usersInfoContentVisible: action.payload }
    case 'SET_TERMS_AND_CONDITIONS_VISIBLE':
      return { ...state, termAndConditionsVisible: action.payload }
    case 'SET_SIGN_OUT_MESSAGE_VISIBLE':
      return { ...state, signOutMessageVisible: action.payload }
    case 'SET_DELETE_ACCOUNT_MESSAGE_VISIBLE':
      return { ...state, deleteAccountMessageVisible: action.payload }
    case 'SET_AFFILIATE_INFO_VISIBLE':
      return { ...state, affiliateInfoVisible: action.payload }
    case 'SET_MANAGMENT_MENU_VISIBLE':
      return { ...state, managmentMenuVisible: action.payload }
    case 'GET_LATEST_APP_VERSION':
      return { ...state, latestAppVersion: action.payload }
    default:
      return state
  }
}

// Action
const getLatestAppVersion = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/auth/device/app-version')
    dispatch({ type: 'GET_LATEST_APP_VERSION', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setBurgerMenuVisible = (dispatch) => async (value) => {
  dispatch({ type: 'BURGER_MENU_VISIBLE', payload: value })
  return
}

const setTermsAndConditionVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_TERMS_AND_CONDITIONS_VISIBLE', payload: value })
}

const setSignOutMessageVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_SIGN_OUT_MESSAGE_VISIBLE', payload: value })
}

const setDeleteAccountMessageVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_DELETE_ACCOUNT_MESSAGE_VISIBLE', payload: value })
}

const setAffiliateInfoVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_AFFILIATE_INFO_VISIBLE', payload: value })
}

const setManagmentMenuVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_MANAGMENT_MENU_VISIBLE', payload: value })
}

const setUsersInfoContentVisible = (dispatch) => async (value) => {
  dispatch({ type: 'SET_USERS_INFO_CONTENT_VISIBLE', payload: value })
}

export const { Context, Provider } = createDataContext(
  BurgerMenuReducer,
  {
    setBurgerMenuVisible,
    setTermsAndConditionVisible,
    setSignOutMessageVisible,
    setAffiliateInfoVisible,
    setManagmentMenuVisible,
    setDeleteAccountMessageVisible,
    getLatestAppVersion,
    setUsersInfoContentVisible,
  },
  // Initial state
  {
    burgerMenuVisible: false,
    usersInfoContentVisible: false,
    termAndConditionsVisible: false,
    signOutMessageVisible: false,
    deleteAccountMessageVisible: false,
    affiliateInfoVisible: false,
    managmentMenuVisible: false,
    latestAppVersion: null,
  }
)
