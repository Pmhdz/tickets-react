import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createTicket } from '../../api/listings'
// import AddImg from './AddImg'
import Dropdown from 'react-bootstrap/dropdown'
class CreateTicket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        title: '',
        description: '',
        price: '',
        category: 0,
        userEmail: this.props.user.email,
        image: '',
        numOfViews: 0
      },
      dropdownCategory: 'Category'
    }
  }

componentDidMount = () => {}

handleChange = (event) => {
  const copiedItem = Object.assign(this.state.item)
  const e = event.target.name

  if (e === 'title' || e === 'description' || e === 'price') {
    copiedItem[event.target.name] = event.target.value
  } else {
    copiedItem.category = event.target.name
    this.setState({ dropdownCategory: this.categories[e] })
  }

  if (copiedItem.category === '0') {
    copiedItem.image = skiImg
  } else if (copiedItem.category === '1') {
    copiedItem.image = snowboardImg
  } else if (copiedItem.category === '2') {
    copiedItem.image = bindingsImg
  } else if (copiedItem.category === '3') {
    copiedItem.image = apparelImg
  }

  this.setState({ item: copiedItem })
}

handleSubmit = (event) => {
  event.preventDefault()
  const { user, msgAlert, history } = this.props

  createTicket(this.state.item, user)
    .then((res) => history.push('/tickets/' + res.data.item._id))
    .then(() =>
      msgAlert({
        heading: 'Ticket Successfully Posted',
        message: 'Check it out.',
        variant: 'success'
      })
    )
    .catch((err) => {
      msgAlert({
        heading: 'Ticket Failed to Post',
        message: 'Something went wrong ' + err.message,
        variant: 'danger'
      })
    })
}

categories = ['Skis', 'Snowboard', 'Boots/Bindings', 'Apparel']

render () {
  const { item } = this.state
  const dropdownJSX = this.categories.map((category) => (
    <Dropdown.Item
      key={category}
      onClick={this.handleChange}
      name={this.categories.indexOf(category)}>
      {category}
    </Dropdown.Item>
  ))
  return (
    <div>
      <Form onSubmit={this.handleSubmit} className='text-center'>
        <h3>Ticket Information</h3>
        <Form.Group controlId='ticket-post'>
          <h5 style={{ float: 'left' }}>Title*</h5>
          <Form.Control
            required
            name='title'
            value={item.title}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <h5 style={{ float: 'left' }}>Description*</h5>
          <Form.Control
            as='textarea'
            rows={4}
            required
            name='description'
            value={item.description}
            placeholder='Description'
            onChange={this.handleChange}
          />
          <h5 style={{ float: 'left' }}>Price*</h5>
          <Form.Control
            required
            name='price'
            value={item.price}
            placeholder='Price'
            onChange={this.handleChange}
          />

          {/* <Form.Control
    required
    name='category'
    value={item.category}
    placeholder='Category'
    onChange={this.handleChange}
/> */}
          <h5 style={{ float: 'left' }}>Category*</h5>
          <Dropdown style={{ position: 'absolute', marginTop: '30px' }}>
            <Dropdown.Toggle id='dropdown-basic'>
              {this.state.dropdownCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>{dropdownJSX}</Dropdown.Menu>
          </Dropdown>
          <Button type='submit' variant='outline-dark'>
                        Post
          </Button>
        </Form.Group>
      </Form>
      <div>
        {/* <Button>
<AddImg />
</Button> */}
      </div>
    </div>
  )
}
}

export default withRouter(CreateTicket)
