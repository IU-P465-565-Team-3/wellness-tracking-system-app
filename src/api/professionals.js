import resourse from './index.js'

export default {
  getProfessionals () {
    return resourse.get('/getProfessionals')
  },
  getsubbedPros () {
    return resourse.get('/subscription')
  },
  getSubcount (id) {
    return resourse.get(`/subscription/${id}/count`)
  },
  addProfessionals (proid) {
    return resourse.post('subscription/' + proid)
  }
}
