import { instance } from './axiosInstance'

export const authAPI = {
  me() {
    return instance.get('/auth/me').then((res) => res.data)
  },
  login(email, password, rememberMe, captcha = false) {
    return instance
      .post('/auth/login', { email, password, rememberMe, captcha })
      .then((res) => res.data)
  },
  logout() {
    return instance.delete('/auth/login').then((res) => res.data)
  },
}