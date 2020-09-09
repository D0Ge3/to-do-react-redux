import * as axios from 'axios'
import { API_KEY } from '../config'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY,
  },
})