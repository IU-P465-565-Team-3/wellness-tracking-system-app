import resource from './index.js'// import index.js instead of this.

// change this in api.get;
export default {
  getResource () {
    return resource.get('/listing')
  }
}
