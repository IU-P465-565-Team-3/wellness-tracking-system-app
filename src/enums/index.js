const Role = Object.freeze({
  Client: 'CLIENT',
  Professional: 'PROFESSIONAL',
  Admin: 'ADMIN'
})

const ListingType = Object.freeze({
  FitnessPlan: 'FITNESS_PLAN',
  MultimediaPost: 'MULTIMEDIA_POST'
})

const ContentType = Object.freeze({
  Text: 'TEXT',
  Image: 'IMAGE',
  Video: 'VIDEO'
})

export {
  Role,
  ListingType,
  ContentType
}
