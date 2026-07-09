import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const normalizeApiUrl = (value) => {
  const apiUrl = (value || '/api/v1').replace(/\/+$/, '')
  return apiUrl.endsWith('/api/v1') ? apiUrl : `${apiUrl}/api/v1`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        normalizeApiUrl(env.VITE_API_URL),
      ),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  }
})
