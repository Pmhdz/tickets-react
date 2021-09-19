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
import Ticket from './components/Tickets/Ticket'
import Tickets from './components/Tickets/Tickets'
import Cart from './components/Products/product'
import { Container, Row, Col } from 'react-bootstrap'
import { initiateProduct, completeProduct } from './api/products'
import CheckoutForm from './components/Products/CheckoutForm'
import CompletedProducts from './components/Products/CompletedProducts'
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
      product: {
        contents: [],
        owner: this.user,
        coupon: '',
        completed: false
      }
    }
  }

	setProduct = (product) => this.setState({ product })

	setUser = (user) => this.setState({ user })

clearProduct = () =>
  this.setState({
    product: {
      contents: [],
      owner: this.user,
      coupon: '',
      completed: false
    }
  })

refreshCart = (product, user) => {
  const id = product._id
  completeProduct(id, user)
    .then(() => initiateProduct(user))
    .then((res) => {
      this.setProduct(res.data.product)
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
  initiateProduct(user).then((res) => {
    this.setProduct(res.data.product)
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
  const { msgAlerts, user, product } = this.state

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
                product={product}
              />
            )}
          />
          <Route
            exact
            path='/tickets'
            render={() => <Tickets msgAlert={this.msgAlert} />}
          />
          <Route
            path='/tickets/:id'
            render={() => (
              <Ticket
                msgAlert={this.msgAlert}
                setOrder={this.setTicket}
                product={product}
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
                product={product}
                setProduct={this.setProduct}
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
                    product={product}
                  />
                </Elements>
              </div>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/products/order-history'
            render={() => (
              <CompletedProducts msgAlert={this.msgAlert} user={user} />
            )}
          />
        </main>
      </Container>
    </Fragment>
  )
}
}

export default App
