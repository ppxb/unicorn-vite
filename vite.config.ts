import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import dayjs from 'dayjs'
import { resolve } from 'path'
import { wrapperEnv } from './build'
import { createProxy } from './build/proxy'
import { createPlugins } from './build/plugin'
import pkg from './package.json'

const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)

const root: string = process.cwd()

const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build')
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_COMPRESSION,
    VITE_CDN,
    VITE_PROXY
  } = wrapperEnv(loadEnv(mode, root))

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    plugins: createPlugins(command, VITE_CDN, VITE_COMPRESSION),
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      drop: ['console', 'debugger']
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
}
