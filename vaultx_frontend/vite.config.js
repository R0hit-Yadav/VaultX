import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443, // Required for Ngrok HTTPS
    },
    allowedHosts: ["7099-2402-a00-404-24e9-a9ef-5d2f-f3f-761a.ngrok-free.app"], // Add your Ngrok URL here
  },
})
