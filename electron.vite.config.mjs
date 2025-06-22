import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import {viteStaticCopy} from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        output: {
          // Ensures ES module output
          // Switching ton ES allows await on file root
          // preventing the follow error: Module format "cjs" does not support top-level await. Use the "es" or "system" output formats rather.
          // Adding this settings, you need to change in package.json the entrypoint from
          // "main": "./out/main/index.js" -> "main": "./out/main/index.mjs"
          //format: "es", 
          // alternatevly you can set type: module in package.json
          entryFileNames: 'index.mjs'
        },
      },
    },
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
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/renderer/**/*.test.js', 'tests/renderer/**/*.test.js']
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
