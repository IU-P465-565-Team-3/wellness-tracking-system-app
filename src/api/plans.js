import api from '.'

export function getListingById (id) {
  return api.get(`/listing/${id}`)
}

export function createListing (listing) {
  return api.post('/listing', listing)
}

export function uploadFile (file) {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/media', formData, {
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

export function getEnrollmentCount (listingId) {
  return api.get(`/listing/${listingId}/enrollment/count`)
}

export function getReviews (id) {
  return api.get(`/listing/${id}/review`)
}

export function getSelfReview (id) {
  return api.get(`/listing/${id}/review/current`)
}

export function addReview (id, data) {
  return api.post(`/listing/${id}/review`, data)
}

export function getTags () {
  return api.get('/tag')
}
