import apiUrl from '../apiConfig'
import axios from 'axios'
// import { data } from 'autoprefixer'

// create tickets request
export const createTicket = (data, user) => {
  return axios({
    url: apiUrl + '/create-ticket',
    method: 'post',
    data: { ticket: data.ticket },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// index of all tickets
export const indexTickets = (user, id) => {
  return axios({
    url: apiUrl + '/tickets?user=' + user._id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// show one ticket
export const showTicket = (id, user) => {
  return axios({
    url: apiUrl + '/tickets/' + id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// delete a ticket
export const deleteTicket = (id, user) => {
  return axios({
    url: apiUrl + '/tickets/' + id,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// update ticket
export const updateTicket = (data, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/tickets/${id}`,
    data: { ticket: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
