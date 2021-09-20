import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { indexEvents } from '../../api/events'

const CompletedEvents = (props) => {
  const [completedEvents, setCompletedEvents] = useState([])
  const { user } = props

  useEffect(() => {
    indexEvents(user)
      .then((res) => {
        const events = res.data.events.filter((event) => event.completed)
        return events
      })
      .then((events) => setCompletedEvents(events))
      .catch((err) => console.error(err))
  }, [])

  const displayTickets = completedEvents.map((event) => (
    <>
      <br></br>
      <li key={event._id}>
        <span>Purchase Date: {event.updatedAt}</span>
        <br></br>
        <span>Order #: {event._id}</span>
      </li>
    </>
  ))

  const list = {
    color: 'black'
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

export default withRouter(CompletedEvents)
