import api from '.'

export function getRecommendationsByTagId (id) {
  return api.get(`/recommendation/tag/${id}`)
}

export function getRecommendationsByDemographic () {
  return api.get('/recommendation/demographic')
}

export function getSubscriptionRecommendations () {
  return api.get('/recommendation/subscription')
}
