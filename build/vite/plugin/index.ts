import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]

  return vitePlugins
}
