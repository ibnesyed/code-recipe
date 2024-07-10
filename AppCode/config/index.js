import axios from 'axios';

// export const base_url = 'http://web.teletix.pk:1949'
export const base_url = 'https://web.teletix.pk:1950'

const END_POINT = base_url + '/api/'

export const httpRequest = axios.create({
    baseURL: END_POINT
})

