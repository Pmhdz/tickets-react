import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateTicket, showTicket } from '../../api/tickets'

class UpdateTicket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ticket: {
        ticketName: '',
        ticketDescription: '',
        location: ''
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, location } = this.props
    showTicket(match.params.id, user, location.ticketId)
      .then((res) => this.setState({ ticket: res.data.ticket }))
  }

handleChange = (event) => {
// the event.target of this event will be an input element
// which will have a `name` attribute (key in the state) & a 'value' (what the user typed)
  const updatedField = { [event.target.name]: event.target.value }
  this.setState((currentState) => {
    return {
      ticket: { ...currentState.ticket, ...updatedField }
    }
  })
}

handleSubmit = (event) => {
  event.preventDefault()

  const { user, msgAlert, history, match } = this.props

  updateTicket(this.state.ticket, match.params.id, user)
    .then((res) => history.push('/tickets')) // + res.data.ticket._id
    .then(() =>
      msgAlert({
        heading: 'Ticket updated Successfully',
        message: 'nice work go check out your Ticket',
        variant: 'success'
      })
    )
    .catch((err) => {
      msgAlert({
        heading: 'Ticket update failed',
        message: 'something went wrong ' + err.message,
        variant: 'danger'
      })
    })
}

render () {
  return (
    <>
      <Form onSubmit={this.handleSubmit} className='text-center'>
        <h3 className='text-dark'>Update Ticket Log</h3>
        <Form.Group controlId='name'>
          <Form.Label className='text-dark'>Ticket Name</Form.Label>
          <Form.Control
            required
            // name='name'
            // value={list.name}
            // placeholder='List Name'
            onChange={this.handleChange}
            name='name'
            defaultValue={this.state.ticket.ticketName}
            placeholder='Ticket Name'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='text-dark'>Ticket Description</Form.Label>
          <Form.Control
            required
            onChange={this.handleChange}
            name='description'
            defaultValue={this.state.ticket.ticketDescription}
            placeholder='Description'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='text-dark'>Location</Form.Label>
          <Form.Control
            required
            onChange={this.handleChange}
            name='location'
            defaultValue={this.state.ticket.location}
            placeholder='Where is the event located at?'
          />
        </Form.Group>
        <Button
          type='submit'
          variant='info'
          className='grad my-3'
          style={{ width: '100%' }}>Submit
        </Button>
      </Form>
      <Button
        onClick={() => this.handleDelete}
        variant='dark'
        style={{ width: '100%' }}>Delete
      </Button>
    </>
  )
}
}

export default withRouter(UpdateTicket)
