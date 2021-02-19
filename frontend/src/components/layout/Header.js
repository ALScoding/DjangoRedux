import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { logout } from '../../actions/auth'

class Header extends React.Component {
  NavigationAuth = () => (
    <Nav className='mr-auto'>
      <Link to='/'>Home</Link>
      {/* <Link to='/' { logout } >Log-out</Link> */}
    </Nav>
  )

  NavigationNonAuth = () => (
    <Nav className='mr-auto'>
      <Link to='/'>Home</Link>
      <Link to='/login'>Log-in</Link>
      <Link to='/register'>Sign-up</Link>
    </Nav>
  )

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
              <Navbar.Brand href='#'>Flashcards App Navbar</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                {this.props.isAuthenticated
                  ? this.NavigationAuth()
                  : this.NavigationNonAuth()}
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

Header = connect(mapStateToProps)(Header)

export default Header
