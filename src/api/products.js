import apiUrl from '../apiConfig'
import axios from 'axios'
// will only ever get users orders
export const indexProducts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/products',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showProduct = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/products/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// checks to see if user has an open order before making one and will return that order(with contents) if found, (else it will return the new open order)
export const initiateProduct = (user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/products/open',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// Does not check to see if use has an existing open order before making one, leading to the potential for multiple open orders in the database
export const createProduct = (user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/products',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      product: {
        contents: [],
        owner: user,
        coupon: '',
        completed: false
      }
    }
  })
}

export const updateProduct = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/products/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      product: {
        contents: data
      }
    }
  })
}

export const completeProduct = (id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/products/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      product: {
        completed: true
      }
    }
  })
}
