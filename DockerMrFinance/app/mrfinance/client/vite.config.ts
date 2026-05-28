import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// dependencias shadcn
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  //resolve referente a shadcn
  plugins: [react({}), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //expone el server correctamente
  server: {
    host: true, // equivale a '0.0.0.0'
    port: 5173, // opcional, por si quieres fijar el puerto
    //proxy para las peticiones al backend
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
