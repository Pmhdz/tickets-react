import { React, Component } from 'react'
import { indexTickets } from '../../api/tickets'
import { Link } from 'react-router-dom'

class IndexTickets extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticket: null,
      loading: false
    }
  }

componentDidMount = () => {
  const { user, msgAlert } = this.props
  indexTickets(user, user._id)
    .then((res) => {
      console.log(res)
      return res
    })
    .then((res) => {
      this.setState({ ticket: res.data.ticket })
    })

    .catch((err) =>
      msgAlert({
        heading: 'Index failed',
        message: 'Something went wrong' + err.message,
        variant: 'danger'
      })
    )
}

// render
render () {
  const { ticket } = this.state
  if (ticket === null) {
    return 'Loading...'
  }
  // const { user } = this.props
  let ticketsJsx
  if (ticket.length === 0) {
    ticketsJsx = 'Got no tickets, Go Create Some!'
  } else {
    ticketsJsx = ticket.map((ticket) => (
      <li key={ticket._id}>
        <Link to={`/tickets/${ticket._id}`}>{ticket.ticketName}</Link>
      </li>
    ))
  }

  return (
    <>
      <h3>All Your Personal Tickets</h3>
      <br></br>
      {ticketsJsx}
    </>
  )
}
}
// forgot to Export
export default IndexTickets
