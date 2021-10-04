import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'https://iub-wellness-tracker-api.herokuapp.com/',
  paramsSerializer: (params) => qs.stringify(params)
})

export default instance