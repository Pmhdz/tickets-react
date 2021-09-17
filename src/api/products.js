import apiUrl from '../apiConfig'
import axios from 'axios'

export const index = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/products'
  })
}

export const showProduct = (id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/products/${id}`
  })
}
