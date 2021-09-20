import apiUrl from '../apiConfig'
import axios from 'axios'
// will only ever get users orders
export const indexEvents = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/events',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showEvent = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/events/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// checks to see if user has an open order before making one and will return that order(with contents) if found, (else it will return the new open order)
export const initiateEvent = (user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/events/open',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// Does not check to see if use has an existing open order before making one, leading to the potential for multiple open orders in the database
export const createEvent = (user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/events',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      event: {
        contents: [],
        owner: user,
        coupon: '',
        completed: false
      }
    }
  })
}

export const updateEvent = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/events/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      event: {
        contents: data
      }
    }
  })
}

export const completeEvent = (id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/events/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      event: {
        completed: true
      }
    }
  })
}
