import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000';

const axiosClient = axios.create({
    baseURL: BACKEND_URL
})

export default axiosClient;