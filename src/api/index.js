import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: process.env.VUE_APP_WEB_API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices', allowDots: true }),
  withCredentials: true
})

export default instance
