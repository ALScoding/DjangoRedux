import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFlashcard, editFlashcard } from '../../actions/flashcards'
import FlashcardForm from './FlashcardForm'

class FlashcardEdit extends Component {
  componentDidMount () {
    this.props.getFlashcard(this.props.match.params.id)
  }

  onSubmit = formValues => {
    this.props.editFlashcard(this.props.match.params.id, formValues)
  }

  render () {
    // if (!this.props.flashcard) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div className='ui container'>
        <h2 style={{ marginTop: '2rem' }}>Edit Flashcard</h2>
        <FlashcardForm
          initialValues={_.pick(this.props.frontside, 'frontside')}
          initialValues={_.pick(this.props.backside, 'backside')}
          initialValues={_.pick(this.props.answer, 'answer')}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  flashcard: state.flashcards[ownProps.match.params.id]
})

export default connect(mapStateToProps, { getFlashcard, editFlashcard })(
  FlashcardEdit
)
