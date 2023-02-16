import axios from 'axios';

const server = axios.create({
    baseUrl: "http://localhost:5000"
})

export default server;