import _ from 'lodash'
import {
  GET_FLASHCARDS,
  GET_FLASHCARD,
  ADD_FLASHCARD,
  DELETE_FLASHCARD,
  EDIT_FLASHCARD
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FLASHCARDS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      }
    case GET_FLASHCARD:
    case ADD_FLASHCARD:
    case EDIT_FLASHCARD:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case DELETE_FLASHCARD:
      return _.omit(state, action.payload)
    default:
      return state
  }
}
