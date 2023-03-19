import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";
import zipPack from "vite-plugin-zip-pack";

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
            { src: 'dist/*', dest: 'extensions/extension_chrome/', overwrite: true },
            { src: 'dist/*', dest: 'extensions/extension_firefox/', overwrite: true },
            { src: 'manifest_chrome.json', dest: 'extensions/extension_chrome/',rename: 'manifest.json', overwrite: true },
            { src: 'manifest_firefox.json', dest: 'extensions/extension_firefox/',rename: 'manifest.json', overwrite: true },
        ],
        overwrite: true
      }),
      zipPack({inDir: 'extension_chrome/', outDir: 'extensions', outFileName: 'extension_chrome.zip'}),
      zipPack({inDir: 'extension_firefox/', outDir: 'extensions', outFileName: 'extension_firefox.zip'}),
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
