import type { ProxyOptions } from 'vite'

type ProxyList = [string, string][]

type ProxyTargetList = Record<string, ProxyOptions>

export const createProxy = (list: ProxyList = []) => {
  const ret: ProxyTargetList = {}

  for (const [prefix, target] of list) {
    ret[`^${prefix}`] = {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), '')
    }
  }
  return ret
}
