import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFlashcards, deleteFlashcard } from '../../actions/flashcards'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/fontawesome-free-solid'
import { fas } from '@fortawesome/free-solid-svg-icons'

class FlashcardList extends Component {
  componentDidMount () {
    this.props.getFlashcards()
  }

  render () {
    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {this.props.flashcards.map(flashcard => (
          <div className='item' key={flashcard.id}>
            <div className='right floated content'>
              <Link
                to={`/delete/${flashcard.id}`}
                className='small ui negative basic button'
              >
                Delete
              </Link>
            </div>
            <div className='content'>
              <FontAwesomeIcon icon={faLanguage} />
              <Link to={`/edit/${flashcard.id}`} className='header'>
                <b>Flashcard #</b> {flashcard.id}
              </Link>
              <div className='frontbackanswer'>
                <b>Frontside: </b>
                {flashcard.frontside} <b> Backside: </b> {flashcard.backside}{' '}
                <b> Answer: </b> {flashcard.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  flashcards: Object.values(state.flashcards)
})

export default connect(mapStateToProps, { getFlashcards, deleteFlashcard })(
  FlashcardList
)
