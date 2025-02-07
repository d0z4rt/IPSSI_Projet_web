import { defineConfig } from '@solidjs/start/config'

export default defineConfig({
  ssr: true,
  server: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/bar',
        '/jeux',
        '/concerts',
        '/blog',
        '/mentions',
        '/privacy',
        '/login',
        '/register',
        '/profile'
      ]
    }
  }
})
