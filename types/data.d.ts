interface LoginProps {
  mobile: string
  password: string
}

interface LoginResult {
  token: string
  expire: string
}