import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vo2trofia-fitness-planner/' // <-- ¡Esta es la línea importante que añadimos!
})
