import axios from 'axios'

const url = `https://api.openweathermap.org/data/2.5/weather?`

export const apiKey = '3f024b701f398517870c5939f1d0a2e2'

export const api = axios.create({
    baseURL: url
})