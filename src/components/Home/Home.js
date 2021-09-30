import React from 'react'
import { Col } from 'react-bootstrap'

export default function Home () {
  return (
    <div className='text-center'>
      <div style={{ height: '30vh' }}>
        <h1
          className='animated animatedFadeInUp fadeInUp'
          style={{
            marginTop: '20vh',
            color: 'primary',
            textDecoration: 'none'
          }}>The App That Allows Users To Create A Tickets And Update Tickets
        </h1>
      </div>
      <div>
        <Col>
          <p style={{ color: 'black', fontSize: '24px' }}>Get started using Pick It Tickets! First, create an account to enter and keep track of yours.Once is entered, you can view that ticket, as well as any following runs you may enter. Each tickets will have the option to be updated and/or deleted.
          </p>
          <h2>Created By Pablo Maldonado-Hernandez</h2>
        </Col>
      </div>
    </div>
  )
}
