import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     // "/api":"https://localhost:8000/",
    //"/api":"https://xhotel-lo9z.onrender.com"
    }
  },
  plugins: [react()],
})
