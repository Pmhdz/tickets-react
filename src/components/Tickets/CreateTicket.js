import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import TicketForm from '../shared/TicketForm'

import { createTicket } from '../../api/tickets'

class CreateTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      distance: '',
      shoe: '',
      difficult: ''
    }
  }

handleChange = (event) => {
  // The event.target of this event will be an input element
  // Which will have a `name` attribute (key in the state) & a `value` (what the user typed)
  this.setState({ [event.target.name]: event.target.value })
}

handleSubmit = (event) => {
  event.preventDefault()

  const { user, msgAlert, history } = this.props

  createTicket(this.state, user)
    .then((res) => history.push('/tickets/' + res.data.ticket.id))
    .then(() =>
      msgAlert({
        heading: 'Ticket Logged!',
        message: 'Nice work, go check out your ticket.',
        variant: 'success'
      })
    )
    .catch((err) => {
      msgAlert({
        heading: 'Ticket log failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      })
    })
}

render () {
  return (
    <>
      <h3>Log your ticket</h3>
      <TicketForm
        ticket={this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    </>
  )
}
}

export default withRouter(CreateTicket)
