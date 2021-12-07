import api from './index.js'

export function getListings ({ q, publisher, tags }) {
  return api.get('/listing', {
    params: {
      q,
      publisher,
      tags
    }
  })
}
