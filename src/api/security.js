import { instance } from './axiosInstance'

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url').then((res) => res.data)
  },
}
