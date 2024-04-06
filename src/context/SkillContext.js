import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const SkillReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: action.payload }
    case 'FETCH_SAMPLE':
      return { ...state, skillSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, skillStatus: action.payload, loading: false }
    case 'FETCH_ALL':
      return { ...state, skills: action.payload, loading: false }
    case 'CREATE':
      return { ...state, skill: action.payload, loading: false }
    case 'EDIT':
      return { ...state, [action.payload._id]: action.payload, loading: false }
    case 'DELETE':
      return _.omit(state, action.payload)
    default:
      return state
  }
}

// Actions
const fetchSkillSample = dispatch => async () => {
  try {
    const response = await ngrokApi.get('/api/skill/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchSkillStatus = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/skill/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchSkills = dispatch => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/skill')
    dispatch({ type: 'FETCH_ALL', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createSkill = dispatch => async (formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/skill', formValues)
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

const editSkill = dispatch => async (id, formValues, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/skill/${id}`, formValues)
    dispatch({ type: 'EDIT', payload: response.data })
    callback()
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
    return
  }
}

const deleteSkill = dispatch => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/skill/${id}`)
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

const clearSkillErrors = dispatch => async () => {
  dispatch({ type: 'CLEAR_ERRORS', payload: null })
  return
}

export const { Context, Provider } = createDataContext(
  SkillReducer,
  {
    fetchSkillSample,
    fetchSkillStatus,
    createSkill,
    fetchSkills,
    editSkill,
    deleteSkill,
    addError,
    clearSkillErrors
  },
  // Initial state
  {
    skill: null,
    skills: null,
    skillSample: null,
    skillStatus: null,
    loading: null,
    error: null
  }
)
