import axios from 'axios'

const resourceCatalog = axios.create({
    baseURL: 'https://iub-wellness-tracker-api.herokuapp.com',
})


export default{
    getResource(){
        return resourceCatalog.get('/listing')
    }
}