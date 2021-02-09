import React from 'react'

const SignOutButton = ({ firebase }) => (
  <p type='button' onClick={firebase.doSignOut}>
    Sign Out
  </p>
)

export default SignOutButton
