import axios from 'axios'

const axiosIns = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

export default axiosIns
