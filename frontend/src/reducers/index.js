import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import flashcards from './flashcards'
import auth from './auth'
import { LOGOUT_SUCCESS } from '../actions/types'

const appReducer = combineReducers({
  form: formReducer,
  flashcards,
  auth
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
