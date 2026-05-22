import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.27.15.215:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
