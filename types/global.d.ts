import type { RouteComponent } from 'vue-router'
import { FunctionalComponent } from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  type ViteCompression =
    | 'none'
    | 'gzip'
    | 'brotli'
    | 'both'
    | 'gzip-clear'
    | 'brotli-clear'
    | 'both-clear'

  interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_ROUTE_HISTORY: string
    VITE_CDN: boolean
    VITE_PROXY: [string, string][]
    VITE_COMPRESSION: ViteCompression
  }

  interface AppRouteRecordRaw {
    path: string
    name?: string
    redirect?: string
    component?: RouteComponent
    meta?: {
      title: string
      icon?: string | FunctionalComponent
      showLink?: boolean
      rank?: number
    }
    children?: AppRouteChildRecordRaw[]
  }

  interface AppRouteChildRecordRaw {
    path: string
    name?: string
    redirect?: string
    component?: RouteComponent
    meta?: {
      title: string
      icon?: string | FunctionalComponent
      extraIcon?: {
        svg?: boolean
        name?: string
      }
      showLink?: boolean
      showParent?: boolean
      roles?: string[]
      auths?: string[]
      keepAlive?: boolean
      frameSrc?: string
      frameLoading?: boolean
      transition?: {
        name?: string
        enterTransition?: string
        leaveTransition?: string
      }
      hiddenTag?: boolean
      dynamicLevel?: number
    }
    children?: AppRouteChildRecordRaw[]
  }
}
