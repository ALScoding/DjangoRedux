import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFlashcard } from '../../actions/flashcards'
import FlashcardForm from './FlashcardForm'

class FlashcardCreate extends Component {
  onSubmit = formValues => {
    this.props.addFlashcard(formValues)
  }

  render () {
    return (
      <div style={{ marginTop: '2rem' }}>
        <FlashcardForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { addFlashcard })(FlashcardCreate)
