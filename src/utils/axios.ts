import axiosInstance from 'axios'

export const axios = axiosInstance.create({
  // baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response)
  },
)

export default axios
