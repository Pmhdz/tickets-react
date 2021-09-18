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
import Product from './components/Products/Product'
import Products from './components/Products/Products'
import Cart from './components/Tickets/ticket'
import { Container, Row, Col } from 'react-bootstrap'
import { initiateTicket, completeTicket } from './api/tickets'
import CheckoutForm from './components/Tickets/CheckoutForm'
import CompletedTickets from './components/Tickets/CompletedTickets'
import { checkoutSuccess, checkoutFailure } from './components/AutoDismissAlert/messages'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const promise = loadStripe(
  'pk_test_51JanJmHKOMeXXROM2h6EjycWXPgjGQ8T9GG4133lMs8VsiCrtK2dHHsUZGnm0R3vOS6Ue91lDJYhbggljlEf04Hf009GBHcqv4'
)

const appContainer = {
  padding: '0px'
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      ticket: {
        contents: [],
        owner: this.user,
        coupon: '',
        completed: false
      }
    }
  }

	setTicket = (ticket) => this.setState({ ticket })

	setUser = (user) => this.setState({ user })

clearTicket = () =>
  this.setState({
    ticket: {
      contents: [],
      owner: this.user,
      coupon: '',
      completed: false
    }
  })

refreshCart = (ticket, user) => {
  const id = ticket._id
  completeTicket(id, user)
    .then(() => initiateTicket(user))
    .then((res) => {
      this.setTicket(res.data.ticket)
    })
    .then((res) => {
      this.msgAlert({
        heading: 'Checkout successful.',
        message: checkoutSuccess,
        variant: 'success'
      })
    })
    .catch((err) => {
      this.msgAlert({
        heading: 'Checkout failure.' + err,
        message: checkoutFailure,
        variant: 'danger'
      })
    })
}

clearUser = () => this.setState({ user: '' })

onSignInSuccess = (user) => {
  initiateTicket(user).then((res) => {
    this.setTicket(res.data.ticket)
  })
}

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
  const { msgAlerts, user, ticket } = this.state

  return (
    <Fragment>
      <Container fluid style={appContainer}>
        <Row className='justify-content-center'>
          <Col xs={12} className='m-auto'>
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
          </Col>
        </Row>
        <main className='container'>
          <Route
            path='/sign-up'
            render={() => (
              <SignUp
                msgAlert={this.msgAlert}
                setUser={this.setUser}
                onSignInSuccess={this.onSignInSuccess}
              />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn
                msgAlert={this.msgAlert}
                setUser={this.setUser}
                setTicket={this.setTicket}
                onSignInSuccess={this.onSignInSuccess}
                ticket={ticket}
              />
            )}
          />
          <Route
            exact
            path='/products'
            render={() => <Products msgAlert={this.msgAlert} />}
          />
          <Route
            path='/products/:id'
            render={() => (
              <Product
                msgAlert={this.msgAlert}
                setOrder={this.setTicket}
                ticket={ticket}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                clearTicket={this.clearTicket}
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
            path='/cart'
            render={() => (
              <Cart
                msgAlert={this.msgAlert}
                user={user}
                ticket={ticket}
                setTicket={this.setTicket}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/cart/checkout'
            render={() => (
              <div className='App'>
                <Elements stripe={promise}>
                  <CheckoutForm
                    refreshCart={this.refreshCart}
                    user={user}
                    ticket={ticket}
                  />
                </Elements>
              </div>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/tickets/order-history'
            render={() => (
              <CompletedTickets msgAlert={this.msgAlert} user={user} />
            )}
          />
        </main>
      </Container>
    </Fragment>
  )
}
}

export default App
