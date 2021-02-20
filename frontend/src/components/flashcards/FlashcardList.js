import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFlashcards, deleteFlashcard } from '../../actions/flashcards'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/fontawesome-free-solid'

class FlashcardList extends Component {
  componentDidMount () {
    this.props.getFlashcards()
  }

  // onDelete = id => {
  //   console.log(id)
  //   console.log(this.props)
  //   this.props.deleteFlashcard(id)
  // }

  render () {
    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {this.props.flashcards.map(flashcard => (
          <div className='item' key={flashcard.id}>
            <div className='right floated content'>
              <Button
                className='small ui negative basic button'
                onClick={() => {
                  this.props.deleteFlashcard(flashcard.id)
                }}
              >
                Delete
              </Button>
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
