import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { indexProducts } from '../../api/products'

const CompletedProducts = (props) => {
  const [completedProducts, setCompletedProducts] = useState([])
  const { user } = props

  useEffect(() => {
    indexProducts(user)
      .then((res) => {
        const products = res.data.products.filter((product) => product.completed)
        return products
      })
      .then((products) => setCompletedProducts(products))
      .catch((err) => console.error(err))
  }, [])

  const displayTickets = completedProducts.map((product) => (
    <>
      <br></br>
      <li key={product._id}>
        <span>Purchase Date: {product.updatedAt}</span>
        <br></br>
        <span>Order #: {product._id}</span>
      </li>
    </>
  ))

  const list = {
    color: 'white'
  }
  return (
    <div className='row'>
      <div style={list} className='col-sm-8 m-auto mt-5'>
        <h4>Recent Purchases</h4>
        <ul>{displayTickets}</ul>
      </div>
    </div>
  )
}

export default withRouter(CompletedProducts)
