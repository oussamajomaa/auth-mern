npm init -y
npm install express mongoose bcryptjs jsonwebtoken cookie-parser nodemailer dotenv cors
Créer un fichier .env côté backnd
Créer un fichier app.js fichier d'entrée




npm create vite@latest frontend
cd frontend
npm install

npm install tailwindcss @tailwindcss/vite

vite.config.ts


import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [tailwindcss(), react()],
});

npm install daisyui

index.css
@import "tailwindcss";
@plugin "daisyui";

