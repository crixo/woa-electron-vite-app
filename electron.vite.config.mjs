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
    //build: {
      // rollupOptions: {
      //   input: {
      //     'locate-db':'src/renderer/locate-db.html',
      //     //index: 'build-out/index.html',
      //   },
      //   output: {
      //     dir: 'out/renderer'
      //   }
      // },
      // outDir: 'build-out', // or 'build', depending on your preference
      // assetsDir: 'assets', // Ensures assets are placed properly    
    //},    
    //publicDir: path.resolve(__dirname, 'build-out/assets'), // Correct build output folder   

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
            src: path.resolve(__dirname, 'src/renderer/locate-db.html'), // Source file
            dest: path.resolve(__dirname, 'out/renderer')// Destination in out/
          }
        ]
      })      
    ]
  }
})
