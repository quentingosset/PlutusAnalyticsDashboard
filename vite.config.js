import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";
import zipPack from "vite-plugin-zip-pack";
import cleanPlugin from 'vite-plugin-clean';
import fs from "fs";

const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env': {
        PACKAGE_VERSION: version
    },
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
      zipPack({inDir: 'extensions/extension_chrome/', outDir: 'extensions', outFileName: 'extension_chrome.zip'}),
      zipPack({inDir: 'extensions/extension_firefox/', outDir: 'extensions', outFileName: 'extension_firefox.zip'}),
      cleanPlugin({targetFiles: ['extensions']})
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
    minify: true,
    sourcemap: true,
  }
})
