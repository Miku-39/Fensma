import axios from 'axios'
import querystring from 'querystring'

import { API_SERVER_URL } from '../../conf/app.conf'

const conf = {
    baseURL: API_SERVER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 5000
}

const instance = axios.create(conf)

const onError = (error) => {
  if (error.response) {
    console.warn('axios onError', error.response)

    if (error.response.status === 400) {
      throw Error('Не верный логин или пароль')
    } else if (error.response.status > 400) {
      throw Error('При обработке запроса на сервере произошла ошибка, мы ее зафиксировали и уже разбираемся в причинах.')
    }
  } else if (error.request) {
    console.warn('axios onError', error.request)
    throw Error('Сервер недоступен. Проверьте свое интернет-соединение')
  } else {
    console.warn('Error', error.message)
  }
  console.log(error.config)
}


export const login = (user, password) =>  {
  const body = `grant_type=password&username=${user}&password=${password}`
  const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}

  return instance.post('/token', body, conf).catch(onError)
}


export const authorize = () => instance.get('/vNext/v1/users/current')
export const setAuthHeader = (token) => instance.defaults.headers.authorization = `Bearer ${token}`


export const fetchBills = (userId) => instance.get(`/vnext/v1/bills?OrderBy=Date desc&filterBy=curator.Id="${userId}"&pageSize=500&pageNumber=1`)
export const updateBillStatus = (bill) => instance.patch(`/vnext/v1/bills/${bill.id}`, {status: bill.status})

export const fetchOrders = (userId) => instance.get(`vNext/v1/customerOrderItems?filterBy=status!=null&OrderBy=actualCreationDate desc`)
export const fetchOrdersOGE = (userId) => instance.get(`/vnext/v1/customerOrderItems?filters=OGE&OrderBy=Date&pageSize=500&pageNumber=1`)
export const fetchOrdersGSM = (userId) => instance.get(`/vnext/v1/customerOrderItems?filters=GSM&OrderBy=Date&pageSize=500&pageNumber=1`)
export const fetchOrdersMech = (userId) => instance.get(`/vnext/v1/customerOrderItems?filters=Mechanization&OrderBy=Date&pageSize=500&pageNumber=1`)
export const fetchOrdersManager = (userId) => instance.get(`/vnext/v1/customerOrderItems?filters=ProjectManager&OrderBy=Date&pageSize=500&pageNumber=1`)
export const updateOrderStatus = (bill) => instance.patch(`/vnext/v1/customerOrderItems/${bill.id}`, {status: bill.status})
