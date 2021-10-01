import React from 'react'
import { Col } from 'react-bootstrap'

export default function Home () {
  return (
    <div className='text-center'>
      <div style={{ height: '30vh' }}>
        <h1
          className='animated animatedFadeInUp fadeInUp'
          style={{
            marginTop: '10vh',
            color: 'primary',
            textDecoration: 'none'
          }}>This App Allows Users To Create A Tickets And Update Tickets That Any Events is Coming Up.
        </h1>
      </div>
      <div>
        <Col>
          <p style={{ color: 'black', fontSize: '27px' }}>To get started using Pick It Tickets you must first create an account to enter and keep track of yours. Once is entered, you can view that ticket, as well as any following runs you may enter. Each tickets will have the option to be updated and/or deleted.
          </p>
          <h2>Created By Pablo Maldonado-Hernandez</h2>
        </Col>
      </div>
    </div>
  )
}
