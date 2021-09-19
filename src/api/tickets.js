import apiUrl from '../apiConfig'
import axios from 'axios'

export const index = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/tickets'
  })
}

export const showTicket = (id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/tickets/${id}`
  })
}
