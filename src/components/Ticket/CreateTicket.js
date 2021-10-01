import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createTicket } from '../../api/tickets'

class CreateTicket extends Component {
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
  const { user, msgAlert, history } = this.props
  createTicket(this.state, user)
    .then((res) => history.push('/tickets')) // + res.data.ticket._id
    .then(() =>
      msgAlert({
        heading: 'Ticket created Successfully',
        message: 'nice work go check out your Ticket',
        variant: 'success'
      })
    )
    .catch((err) => {
      msgAlert({
        heading: 'Ticket creation failed',
        message: 'something went wrong ' + err.message,
        variant: 'danger'
      })
    })
}

render () {
  return (
    <>
      <Form onSubmit={this.handleSubmit} className='text-center'>
        <h3 className='text-dark'>Create New Ticket Log</h3>
        <Form.Group controlId='ticketName'>
          <Form.Label className='text-dark'>Ticket Name</Form.Label>
          <Form.Control
            required
            // name='name'
            // value={list.name}
            // placeholder='List Name'
            onChange={this.handleChange}
            name='ticketName'
            defaultValue={this.state.ticket.ticketName}
            placeholder='Ticket Name'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='text-dark'>Ticket Description</Form.Label>
          <Form.Control
            required
            onChange={this.handleChange}
            name='ticketDescription'
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
          variant='outline-dark'
          className='grad my-3'
          style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
    </>
  )
}
}

export default withRouter(CreateTicket)
