// import { cloudflare } from '@cloudflare/vite-plugin'
// import { defineConfig } from 'vite'
// import ssrPlugin from 'vite-ssr-components/plugin'

// export default defineConfig({
//     plugins: [cloudflare(), ssrPlugin()],
//     server: {
//         port: 5173
//     },
//     publicDir: 'public',   // <-- ensure Vite serves everything inside /public
//   build: {
//     copyPublicDir: true  // <-- REQUIRED so /public files are included in build output
//   }
// })

import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'

export default defineConfig({
  plugins: [
    cloudflare({
      site: {
        bucket: './public'   // <-- THIS IS THE IMPORTANT FIX
      }
    }),
    ssrPlugin()
  ],

  publicDir: 'public',
  build: {
    copyPublicDir: true,
  },

  server: {
    port: 5173
  }
})
