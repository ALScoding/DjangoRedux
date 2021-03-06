import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../components/layout/Header'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import FlashcardEdit from '../components/flashcards/FlashcardEdit'
import FlashcardDelete from '../components/flashcards/FlashcardDelete'
import FlashcardCreate from '../components/flashcards/FlashcardCreate'
import FlashcardList from '../components/flashcards/FlashcardList'
import Dashboard from '../components/flashcards/Dashboard'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store'

const div = document.createElement('div')

describe('Login Form', () => {
  // the test should pass
  it('Login Form renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </Router>,
      div
    )
  })
})

describe('Register Form', () => {
  // the test should pass
  it('Register Form renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </Router>,
      div
    )
  })
})

describe('Navigation bar', () => {
  // the test should pass
  it('Navigation component renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>,
      div
    )
  })
})

describe('Flashcard Creating Component', () => {
  // the test should pass
  it('FlashcardCreate component renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <FlashcardCreate />
      </Provider>,
      div
    )
  })
})

describe('Flashcard Deleting Component', () => {
  // the test should pass
  it('FlashcardDelete component renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <FlashcardDelete />
      </Provider>,
      div
    )
  })
})

describe('Flashcard Editing Component', () => {
  // the test should pass
  it('FlashcardEdit component renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <FlashcardEdit />
      </Provider>,
      div
    )
  })
})

describe('Flashcard List Component', () => {
  // the test should pass
  it('FlashcardList component renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <FlashcardList />
      </Provider>,
      div
    )
  })
})

describe('Dashboard Component', () => {
  // the test should pass
  it('Dashboard component renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
      div
    )
  })
})
