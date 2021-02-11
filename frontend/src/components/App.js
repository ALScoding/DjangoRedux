import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'
import Header from './layout/Header'
import Dashboard from './flashcards/Dashboard'
import FlashcardDelete from './flashcards/FlashcardDelete'
import FlashcardEdit from './flashcards/FlashcardEdit'

import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'
import PrivateRoute from './common/PrivateRoute'

import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/delete/:id' component={FlashcardDelete} />
            <Route exact path='/edit/:id' component={FlashcardEdit} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
