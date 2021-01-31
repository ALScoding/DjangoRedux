import React, { Component } from 'react'
import FlashcardCreate from './FlashcardCreate'
import FlashcardList from './FlashcardList'

class Dashboard extends Component {
  render () {
    return (
      <div className='ui container'>
        <FlashcardCreate />
        <FlashcardList />
      </div>
    )
  }
}

export default Dashboard
