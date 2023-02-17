import vue from '@vitejs/plugin-vue'
// @ts-expect-error
import ElementPlus from 'unplugin-element-plus/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export const createPlugins = (
  command: string,
  cdn: boolean,
  compression: ViteCompression
) => {
  return [
    vue(),
    UnoCSS({
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    ElementPlus()
  ]
}
