import vue from '@vitejs/plugin-vue'

export const createPlugins = (
  command: string,
  cdn: boolean,
  compression: ViteCompression
) => {
  return [vue()]
}
