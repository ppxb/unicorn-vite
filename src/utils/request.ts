import axios from 'axios'
import { useToken } from '@/hooks/useToken'
import { ElMessage } from 'element-plus'

const prefixUrl = import.meta.env.VITE_BASE_URL as string

const requestList: string[] = []
const source = axios.CancelToken.source()

const request = axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ? prefixUrl : '/api',
  timeout: 180 * 1000
})

const handleError = (error: string, message?: string) => {
  console.error('错误信息', error)
  ElMessage({
    message: message || error || '服务器内部错误',
    type: 'error'
  })
}

request.interceptors.request.use(
  config => {
    const { getToken } = useToken()
    const token = getToken() || ''
    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const requestFlag = `${JSON.stringify(config.url)}&${JSON.stringify(config.data)}&${JSON.stringify(config.method)}`
    if (requestList.includes(requestFlag)) source.cancel()
    else requestList.push(requestFlag)
    return config
  },
  error => {
    handleError(error, '服务器内部错误')
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    const requestFlag = `${JSON.stringify(response.config.url)}&${JSON.stringify(response.config.data)}&${response.config.method}`
    const index = requestList.findIndex(item => item === requestFlag)
    requestList.slice(index, 1)

    switch (res?.code) {
      case 400001:
        handleError(res?.msg, '权限不足，请重新登录')
        return Promise.reject(response)
    }
    return Promise.resolve(response)
  },
  error => {
    requestList.length = 0
    handleError(error, '服务器内部错误')
    return Promise.reject(error)
  }
)

export default request