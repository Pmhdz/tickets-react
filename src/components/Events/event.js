import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { updateEvent, showEvent } from '../../api/events'

const button = {
  width: 'inherit'
}

const card = {
  display: 'inline-block',
  margin: 'auto',
  width: '75%',
  padding: '25px'
}

const Cart = (props) => {
  const { event, user, setEvent } = props

  const handleRemoveOne = (event) => {
    // event.preventDefault()
    const targetId = event.target.value
    // grad the order contents from state bind to oldOrder
    let oldEvent = event.contents
    // iterate over all order items, when we match our targetId (argument from function call),
    // decrement by one, only if the quantity is 1 or more.  If not, do nothing, deal with
    // this case in the next statement.
    oldEvent.forEach((item) => {
      if (item.id === targetId && item.quantity > 0) {
        item.quantity--
      }
    })
    // this uses a negative condition for the boolean to delete a zero amount
    oldEvent = oldEvent.filter((item) => item.quantity !== 0)
    // now updates the order array at the API level.
    const id = event._id
    updateEvent(id, oldEvent, user)
      .then(() => {
        return showEvent(id, user)
      })
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error(err))
  }

  const handleAddOne = (event) => {
    // getting id from the value stored on the card in the DOM
    const targetId = event.target.value
    // variable to hold our state order object
    const oldEvent = event.contents
    // iterate through all our order and increment where the id's match
    oldEvent.forEach((item) => {
      if (item.id === targetId) {
        item.quantity++
      }
    })
    // API call to update the order
    const id = event._id
    updateEvent(id, oldEvent, user)
      .then(() => {
        return showEvent(id, user)
      })
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error(err))
  }

  const handleRemoveAll = (event) => {
    // pull ID from DOM element we clicked
    const targetId = event.target.value
    // hold our state object in a local variable
    const oldEvent = event.contents
    // iterate through and find the matching ID and set quantity to 0
    oldEvent.forEach((item) => {
      if (item.id === targetId) {
        item.quantity = 0
      }
    })
    // call handle removeOne to delete out of the cart.
    handleRemoveOne(event)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  let total = 0
  const sumTotal = (num) => {
    total += num
  }

  const cartContent = event.contents.map((item) => (
    <div key={item.event._id} className='col-3 mt-5'>
      <Card style={{ width: '25rem' }} className='m-auto'>
        <Card.Img variant='top' src={`${item.event.image}`} style={card} />
        <Card.Body>
          <Card.Title>{item.event.name}</Card.Title>
          <Card.Text>Price: ${item.event.price}</Card.Text>
          <Card.Text>Quantity: {item.quantity}</Card.Text>
          <Card.Text>
            Subtotal: {formatter.format(item.quantity * item.event.price)}
          </Card.Text>
          {sumTotal(item.quantity * item.event.price)}
          <Button
            style={button}
            value={item.event._id}
            onClick={handleRemoveOne}
            variant='secondary'>
            -
          </Button>{' '}
          <Button
            style={button}
            value={item.event._id}
            onClick={handleAddOne}
            variant='secondary'>
            +
          </Button>{' '}
          <Button
            style={button}
            value={item.event._id}
            onClick={handleRemoveAll}
            variant='secondary'>
            Remove All
          </Button>{' '}
        </Card.Body>
      </Card>
    </div>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3 style={{ color: 'black' }}>
        Order Total: {formatter.format(total)}
        </h3>
        <Link to='/cart/checkout'>
          <Button
            style={{ width: '100px', textDecoration: 'none' }}
            variant='warning'>
            Checkout
          </Button>
        </Link>
        <row>{cartContent}</row>
      </div>
    </div>
  )
}

export default withRouter(Cart)
