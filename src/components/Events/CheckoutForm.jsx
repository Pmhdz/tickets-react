import React, { useState, useEffect } from 'react'
import apiUrl from '../../apiConfig'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function CheckoutForm (props) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const { refreshCart, user, event } = props

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(apiUrl + '/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: [{ id: 'tickets-sales' }] })
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      },
      button: {
        background: '#5469d4',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        borderRadius: '0 0 4px 4px',
        border: '0',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'block',
        transition: 'all 0.2s ease',
        boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
        width: '100%'
      }
    }
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      refreshCart(event, user)
    }
  }

  return (
    <div id='checkout'>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          options={cardStyle}
        >
          <span id="button-text">
            {processing
              ? (
                <div className="spinner" id="spinner"></div>
              )
              : (
                'Pay now'
              )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Purchase successful
          <a text='Thank you for your purchase'
            href={'https://dashboard.stripe.com/test/payments'}
          >
            {' '}
          </a>
        </p>
      </form>
    </div>
  )
}
