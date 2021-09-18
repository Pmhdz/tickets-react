import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { showProduct } from '../../api/products'
import { updateTicket, showTicket } from '../../api/ticket'
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

const Products = (props) => {
  const [product, setProduct] = useState(null)
  const { ticket, user, setTicket, msgAlert } = props

  useEffect(() => {
    showProduct(props.match.params.id)
      .then((res) => setProduct(res.data.product))
      .catch(console.error)
  }, [])

  const handleAddToCart = () => {
    const oldTicket = ticket.contents
    let matched = false
    const ticketObj = {
      id: product._id,
      quantity: 1,
      product: product
    }
    if (oldTicket.length === 0) {
      oldTicket.push(ticketObj)
    } else {
      // iterate each item, if id's match, increment quantity
      oldTicket.forEach((item) => {
        if (item.id === product._id) {
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
        oldTicket.push(ticketObj)
      }
    }

    const id = ticket._id
    updateTicket(id, oldTicket, user)
      .then(() => {
        return showTicket(id, user)
      })
      .then((res) => setTicket(res.data.ticket))
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

  if (!product) {
    return <p>Loading...</p>
  }

  const { name, image, description, price } = product
  // const secondary = 'Secondary'
  return (
    <Row>
      <Col xs={10} md={8} style={cardCol}>
        <Card style={card} className='m-auto'>
          <Card.Img variant='top' src={`${image}`} style={cardImg} />
          <Card.Body style={cardBody}>
            <Card.Title style={cardTitle}>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>${price}</Card.Text>
            <Button style={button} onClick={handleAddToCart} variant='primary'>Add to Cart </Button>{' '}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default withRouter(Products)
