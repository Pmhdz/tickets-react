import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { indexTickets } from '../../api/tickets'

const CompletedTickets = (props) => {
  const [completedTickets, setCompletedTickets] = useState([])
  const { user } = props

  useEffect(() => {
    indexTickets(user)
      .then((res) => {
        const tickets = res.data.tickets.filter((ticket) => ticket.completed)
        return tickets
      })
      .then((tickets) => setCompletedTickets(tickets))
      .catch((err) => console.error(err))
  }, [])

  const displayTickets = completedTickets.map((ticket) => (
    <>
      <br></br>
      <li key={ticket._id}>
        <span>Purchase Date: {ticket.updatedAt}</span>
        <br></br>
        <span>Order #: {ticket._id}</span>
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

export default withRouter(CompletedTickets)
