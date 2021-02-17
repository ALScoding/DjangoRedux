import React from 'react'
import ReactDOM from 'react-dom'
//import NavigationAuth from '../components/Navigation/.'
//import NavigationNonAuth from '../components/Navigation/.'
import Header from '../components/layout/Header'
import { BrowserRouter as Router } from 'react-router-dom'

const div = document.createElement('div')
describe('Navigation bar', () => {
  // the test should pass
  it('Navigation component renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <Header />
      </Router>,
      div
    )
  })

  //   // the test should pass
  //   it('Navigation Non-Auth component renders without crashing', () => {
  //     ReactDOM.render(
  //       <Router>
  //         <NavigationNonAuth />
  //       </Router>,
  //       div
  //     )
  //   })
})
