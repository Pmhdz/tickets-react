import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'

import { index } from '../../api/products'

const cardImg = {
  margin: 'auto',
  padding: '25px',
  width: 'auto',
  height: '200px'
}

const cardCol = {
  margin: 'auto',
  marginTop: '10px'
}

const cardTitle = {
  height: '50px'
}

const cardBody = {
  backgroundColor: 'grey',
  borderRadius: '0px 0px 8px 8px',
  color: 'white'
}

const card = {
  border: 'none',
  borderRadius: '10px'
}

const Products = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    index()
      .then((res) => setProducts(res.data.products))
      .catch(console.error)
  }, [])

  const productList = products.map((item) => (
    <Col xs={12} md={6} lg={4} xl={4} key={item._id} style={cardCol}>
      <Card style={card} className='m-auto'>
        <Link style={{ margin: 'auto' }} to={`/products/${item._id}`}>
          <Card.Img variant='top' src={`${item.image}`} style={cardImg} />
        </Link>
        <Card.Body style={cardBody}>
          <Card.Title style={cardTitle}>{item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))

  return (
    <Row>
      <h3 className='text-light'>Products</h3>
      <Col xs={12} style={{ marginTop: '10px' }}>
        <Row>{productList}</Row>
      </Col>

      <div className='col-12 mt-5'></div>
    </Row>
  )
}

export default withRouter(Products)
