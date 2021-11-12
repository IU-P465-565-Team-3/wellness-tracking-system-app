import api from '.'

export function getPlan (id) {
  return api.get(`/listing/${id}`)
}

export function createListing (listing) {
  return api.post('/listing', listing)
}

export function uploadFile (file) {
  const formData = new FormData()
  formData.append('file', file)
  api.post('/media', formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
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
