import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    base: '/',
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 8080,
    },
    preview: {
      host: true,
      port: 3000,
      allowedHosts: [
        "fusion.esparkconsultants.com",
        "fusion-stg.esparkconsultants.com",
        "fusion-stg-api.esparkconsultants.com",
      ],
    },
  });
};
