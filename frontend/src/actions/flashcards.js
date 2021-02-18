import axios from 'axios'
import { reset } from 'redux-form'
import history from '../history'
import {
  GET_FLASHCARDS,
  GET_FLASHCARD,
  ADD_FLASHCARD,
  DELETE_FLASHCARD,
  EDIT_FLASHCARD
} from './types'

// GET FLASHCARDS
export const getFlashcards = () => async dispatch => {
  const res = await axios.get('/api/studying/')
  dispatch({
    type: GET_FLASHCARDS,
    payload: res.data
  })
}

// GET FLASHCARD
export const getFlashcard = id => async dispatch => {
  const res = await axios.get(`/api/studying/${id}/`)
  dispatch({
    type: GET_FLASHCARD,
    payload: res.data
  })
}

// ADD FLASHCARD
export const addFlashcard = formValues => async dispatch => {
  const res = await axios.post('/api/studying/', { ...formValues })
  dispatch({
    type: ADD_FLASHCARD,
    payload: res.data
  })
  dispatch(reset('flashcardForm'))
}

// DELETE FLASHCARD
export const deleteFlashcard = id => async dispatch => {
  console.log('hellosjdfkjls')
  await axios
    .delete(`/api/studying/${id}/`)
    .then(res => {
      console.log('deletedkkkk;k' + res)
    })
    .catch(error => {
      console.log(error)
    })
  console.log('yesyes')
  dispatch({
    type: DELETE_FLASHCARD,
    payload: id
  })
  history.push('/')
}
// export const deleteFlashcard = id => {
//   console.log('this works')
//   return async dispatch => {
//     console.log('also works')
//     await axios.delete(`/api/studying/${id}/`)
//     dispatch({
//       type: DELETE_FLASHCARD,
//       payload: id
//     })
//     history.push('/')
//   }
// }

// EDIT FLASHCARD
export const editFlashcard = (id, formValues) => async dispatch => {
  const res = await axios.patch(`/api/studying/${id}/`, formValues)
  dispatch({
    type: EDIT_FLASHCARD,
    payload: res.data
  })
  history.push('/')
}
