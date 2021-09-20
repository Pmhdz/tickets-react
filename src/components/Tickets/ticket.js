import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { showTicket } from '../../api/tickets'
import { updateProduct, showProduct } from '../../api/products'
import {
  addedToCartFailure,
  addedToCartSuccess
} from '../AutoDismissAlert/messages'

const card = {
  border: 'none',
  borderRadius: '10px'
}

const cardImg = {
  margin: 'auto',
  padding: '25px',
  width: 'auto',
  height: '200px'
}

const cardTitle = {
  height: '50px'
}

const cardCol = {
  margin: 'auto',
  marginTop: '10px'
}

const cardBody = {
  backgroundColor: 'grey',
  borderRadius: '0px 0px 8px 8px',
  color: 'white'
}

const button = {
  width: 'inherit'
}

const Tickets = (props) => {
  const [ticket, setTicket] = useState(null)
  const { product, user, setProduct, msgAlert } = props

  useEffect(() => {
    showTicket(props.match.params.id)
      .then((res) => setTicket(res.data.ticket))
      .catch(console.error)
  }, [])

  const handleAddToCart = () => {
    const oldProduct = product.contents
    let matched = false
    const productObj = {
      id: ticket._id,
      quantity: 1,
      ticket: ticket
    }
    if (oldProduct.length === 0) {
      oldProduct.push(productObj)
    } else {
      // iterate each item, if id's match, increment quantity
      oldProduct.forEach((item) => {
        if (item.id === ticket._id) {
          // this will track if we've matched for below boolean
          matched = true
          item.quantity++
        }
      })
      // after the forEach if there's no match go ahead and push the object,
      // we need this tracker boolean, because we don't want to have the case of pushing
      // multiple time inside the forEach loop.  This gives us a way to remember that there
      // was no match.  It will false-out if it was turned true.
      if (matched === false) {
        oldProduct.push(productObj)
      }
    }

    const id = product._id
    updateProduct(id, oldProduct, user)
      .then(() => {
        return showProduct(id, user)
      })
      .then((res) => setProduct(res.data.product))
      .then(() =>
        msgAlert({
          heading: 'Added to Cart...',
          message: addedToCartSuccess,
          variant: 'success'
        })
      )
      .catch(() => {
        msgAlert({
          heading: 'Could not add to Cart.',
          message: addedToCartFailure,
          variant: 'danger'
        })
      })
  }

  if (!ticket) {
    return <p>Loading...</p>
  }

  const { name, image, description, price } = ticket
  return (
    <Row>
      <Col xs={10} md={8} style={cardCol}>
        <Card style={card} className='m-auto'>
          <Card.Img variant='top' src={`${image}`} style={cardImg} />
          <Card.Body style={cardBody}>
            <Card.Title style={cardTitle}>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>${price}</Card.Text>
            <Button style={button} onClick={handleAddToCart} variant='primary'>Add to Cart{' '}
            </Button>{' '}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default withRouter(Tickets)
