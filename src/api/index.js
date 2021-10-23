import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'https://iub-wellness-tracker-api.herokuapp.com/api',
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices', allowDots: true }),
  withCredentials: true
})

export default instance
