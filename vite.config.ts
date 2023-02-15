import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import pkg from './package.json'
import dayjs from 'dayjs'
import { createVitePlugins } from './build/vite/plugin'
import { wrapperEnv } from './build/utils'

const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
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
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
