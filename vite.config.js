import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env': process.env,
  },
  plugins: [
      vue(),
      copy({
        targets: [
            { src: 'dist/*', dest: 'extension_chrome/', overwrite: true },
            { src: 'dist/*', dest: 'extension_firefox/', overwrite: true },
            { src: 'manifest_chrome.json', dest: 'extension_chrome/',rename: 'manifest.json', overwrite: true },
            { src: 'manifest_firefox.json', dest: 'extension_firefox/',rename: 'manifest.json', overwrite: true },
        ],
        overwrite: true
      })
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: true
  }
})
