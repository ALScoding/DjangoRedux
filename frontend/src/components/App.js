import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'
import Header from './layout/Header'
import Dashboard from './flashcards/Dashboard'
import FlashcardDelete from './flashcards/FlashcardDelete'
import FlashcardEdit from './flashcards/FlashcardEdit'

import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/delete/:id' component={FlashcardDelete} />
            <Route exact path='/edit/:id' component={FlashcardEdit} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
