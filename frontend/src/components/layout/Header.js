import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

// function mapStateToProps (state) {
//   const { flashcards } = state
//   return { flashcardList: flashcards.allIds }
// }

class Header extends React.Component {
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <Router>
              <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
                <Navbar.Brand href='#'>Flashcards App Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='mr-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/login'>Log-in</Nav.Link>
                    <Nav.Link href='/register'>Sign-up</Nav.Link>
                  </Nav>
                  <Form inline>
                    <FormControl
                      type='text'
                      placeholder='Search'
                      className='mr-sm-2'
                    />
                    <Button variant='outline-success'>Search</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
              <br />
              <Switch>
                <Route path='/login' component={LoginForm}></Route>
                <Route path='/register' component={RegisterForm}></Route>
                <button onClick={this.handleLogout}>Log-out</button>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
