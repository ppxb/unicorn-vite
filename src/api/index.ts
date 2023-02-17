import request from '@/utils/request'

export const login = (data: LoginProps) => request.post<Result<LoginResult>>('/base/login', data)
