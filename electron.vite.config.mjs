import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import {viteStaticCopy} from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index:'src/preload/index.js',
          'locate-db':'src/preload/locate-db.js',
        },
        output: {
          dir: 'out/preload'
        }
      },
    },

    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, 'src/renderer/locate-db.html').replace(/\\/g, '/'), // Source file - for win compliance
            dest: path.resolve(__dirname, 'out/renderer').replace(/\\/g, '/'),// Destination in out/  - for win compliance
          }
        ]
      })      
    ]
  }
})
