import api from '.'

export function getPlan (id) {
  return api.get(`/listing/${id}`)
}

export function getEnrollments () {
  return api.get('/enrollment')
}

export function createAndEnrollToPlan (data) {
  return api.post('/enrollment', data)
}

export function enrollToPlan (id, data) {
  return api.post(`/enrollment/${id}`, data)
}
