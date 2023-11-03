import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        '404': './404.html',
        '01': './shaders/01/index.html',
        '02': './shaders/02/index.html',
        '03': './shaders/03/index.html',
        '04': './shaders/04/index.html',
      }
    }
  },
  publicDir: './assets'
})