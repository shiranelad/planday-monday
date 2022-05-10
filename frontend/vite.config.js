import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ElementPlus from 'unplugin-element-plus/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600
  },

  css: {
    postcss: {
      plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
      ],
    },
}
})
