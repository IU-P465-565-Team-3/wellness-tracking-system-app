module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wellness-tracking-system-app/'
    : '/'
,
transpileDependencies: [
  'vuetify'
]
}
