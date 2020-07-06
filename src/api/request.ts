import { request } from './index'

// 登录
export const login = (data: { userName: string; password: string }) => {
  return request({ method: 'POST', url: '/admin/login', data })
}
