import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export function authorization(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export default api
