/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// import Ticket from './components/Tickets/Ticket'
// import Tickets from './components/Tickets/Tickets'
import CreateTicket from './components/Tickets/CreateTicket'
// // import Cart from './components/Events/event'
// import { Container, Row, Col } from 'react-bootstrap'
// import { initiateEvent, completeEvent } from './api/events'
// import CheckoutForm from './components/Events/CheckoutForm'
// import CompletedEvents from './components/Events/CompletedTickets'
// import { checkoutSuccess, checkoutFailure } from './components/AutoDismissAlert/messages'
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'

// // change this to secret key
// const promise = loadStripe(
//   'pk_test_51JanJmHKOMeXXROM2h6EjycWXPgjGQ8T9GG4133lMs8VsiCrtK2dHHsUZGnm0R3vOS6Ue91lDJYhbggljlEf04Hf009GBHcqv4'
// )

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

setUser = (user) => this.setState({ user })

clearUser = () => this.setState({ user: null })

deleteAlert = (id) => {
  this.setState((state) => {
    return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
  })
}

msgAlert = ({ heading, message, variant }) => {
  const id = uuid()
  this.setState((state) => {
    return {
      msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
    }
  })
}

render () {
  const { msgAlerts, user } = this.state

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={this.deleteAlert}
        />
      ))}
      <main className='container'>
        <Route
          path='/sign-up'
          render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )}
        />
        <Route
          path='/sign-in'
          render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )}
        />
        <Route
          path='/'
          exact
          render={() => (
            <Home msgAlert={this.msgAlert} setUser={this.setUser} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/sign-out'
          render={() => (
            <SignOut
              msgAlert={this.msgAlert}
              clearUser={this.clearUser}
              user={user}
            />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/change-password'
          render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          exact
          path='/create-ticket'
          render={() => (
            <CreateTicket msgAlert={this.msgAlert} user={user} />
          )}
        />

        <AuthenticatedRoute
          user={user}
          exact
          path='/tickets'
          render={() => (
            <IndexTickets msgAlert={this.msgAlert} user={user} />
          )}
        />

        <AuthenticatedRoute
          user={user}
          exact
          path='/tickets/:id/update'
          render={() => (
            <UpdateTicket msgAlert={this.msgAlert} user={user} />
          )}
        />

        <AuthenticatedRoute
          user={user}
          exact
          path='/tickets/:id'
          render={() => <ShowTicket msgAlert={this.msgAlert} user={user} />}
        />
      </main>
    </Fragment>
  )
}
}

export default App
