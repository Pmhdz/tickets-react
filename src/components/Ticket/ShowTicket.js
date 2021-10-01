import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
// API request
import { deleteTicket, showTicket } from '../../api/tickets'
import Button from 'react-bootstrap/Button'

class ShowTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticket: {
        ticketName: '',
        ticketDescription: '',
        location: ''
      }
    }
  }

  componentDidMount () {
    // console.log('test')
    const { match, user, msgAlert } = this.props
    showTicket(match.params.id, user)
      .then((res) => this.setState({ ticket: res.data.ticket }))
      .then(() =>
        msgAlert({
          heading: 'show ticket success',
          message: 'check out the ticket',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Show ticket failed',
          message: 'something went wrong' + err.message,
          variant: 'danger'
        })
      )
  }

handleDelete = (event) => {
  console.log('adam')
  const { match, user, msgAlert, history } = this.props
  deleteTicket(match.params.id, user)
    // redirect to tickets
    .then(() => history.push('/tickets'))
    // .then(() => history.push(match.url))
    .then(() =>
      msgAlert({
        heading: 'Ticket Deleted Successfully',
        message: 'Your Ticket no longer exists',
        variant: 'success'
      })
    )
    .catch((err) =>
      msgAlert({
        heading: 'Failed to Delete Your Ticket',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      })
    )
}

render () {
  // if (this.state.ticket === null) {
  //   console.log('this is in show tickets')
  //   return 'Loading...'
  // }
  const {
    ticketName,
    ticketDescription,
    location,
    owner
  } = this.state.ticket
  const { match, user } = this.props
  // console.log(user._id, owner)
  const updateButton =
        user._id === owner
          ? (
            <>
              <Link to={`/tickets/${match.params.id}/update`}>
                <Button
                  variant='warning'
                  style={{
                    width: '100%',
                    display: 'grid',
                    textDecoration: 'none'
                  }}>
                        -Update-
                </Button>
              </Link>
              <Button
                onClick={this.handleDelete}
                variant='dark'
                style={{ width: '100%', display: 'grid', paddingTop: '15px' }}>
                    -Delete-
              </Button>
            </>
          )
          : null
  return (
    <>
      <Card
        className='card-grad m-2'
        style={{
          width: 'auto',
          height: 'auto',
          color: 'grey'
        }}>
        {updateButton}
        <Card.Header className='dark-bg text dark'>
          <div className='d-flex justify-content-end'>
            <p className='text-center' style={{ margin: 'auto' }}>
              {`${user.email}'s ticket:`}
            </p>
          </div>
        </Card.Header>
        <Card.Body className='dark-bg d-flex justify-content-start justify-content-md-center flex-wrap'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>Ticket Name: {ticketName}</li>
            <br></br>
            <li className='list-group-item'>Ticket Description: {ticketDescription}</li>
            <br></br>
            <li className='list-group-item'>Where is the event located at?: {location}
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  )
}
}

export default withRouter(ShowTicket)
