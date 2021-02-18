import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../layout/Modal'
import history from '../../history'
import { getFlashcard, deleteFlashcard } from '../../actions/flashcards'

class FlashcardDelete extends Component {
  componentDidMount () {
    this.props.getFlashcard(this.props.match.params.id)
  }

  renderContent () {
    if (!this.props.flashcard) {
      return 'Are you sure you want to delete this card?'
    }
    return `Are you sure you want to delete the card: ${this.props.flashcard.frontside}`
  }

  // onDelete = id => {
  //   console.log(id)
  //   console.log(this.props)
  //   this.props.deleteFlashcard(id)
  // }

  renderActions () {
    const { id } = this.props.match.params
    return (
      <Fragment>
        <button
          id='delete'
          onClick={this.onDelete}
          className='ui negative button'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    )
  }

  render () {
    return (
      <Modal
        title='Delete Flashcard'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  flashcard: state.flashcards[ownProps.match.params.id]
})

export default connect(mapStateToProps, { getFlashcard, deleteFlashcard })(
  FlashcardDelete
)
