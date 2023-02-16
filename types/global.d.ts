declare type ViteCompression =
  | 'none'
  | 'gzip'
  | 'brotli'
  | 'both'
  | 'gzip-clear'
  | 'brotli-clear'
  | 'both-clear'

declare interface ViteEnv {
  VITE_PORT: number
  VITE_PUBLIC_PATH: string
  VITE_ROUTE_HISTORY: string
  VITE_CDN: boolean
  VITE_PROXY: [string, string][]
  VITE_COMPRESSION: ViteCompression
}
