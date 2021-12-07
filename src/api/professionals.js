import resourse from './index.js'

export default {
  // Get list of all professionals in database
  getProfessionals () {
    return resourse.get('/getProfessionals')
  },
  // Get list of all subscribed professionals of current user (id => current user's id)
  getsubbedPros () {
    return resourse.get('/subscription')
  },
  getSubbedUsers (id) {
    return resourse.get(`/user/${id}/subscriber/`)
  },
  // Get count of suscribed professionals of current user (id => current user's id)
  getSubcount (id) {
    return resourse.get(`/subscription/${id}/count`)
  },
  getSubUserCount (id) {
    return resourse.get(`/user/${id}/subscriber/count`)
  },
  // Post Request to add the selected professionals to current user subscribed list (id => id of the selected professional)
  addProfessionals (id) {
    resourse.post(`/subscription/${id}`)
  }
}
