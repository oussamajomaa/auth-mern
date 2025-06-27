# ⚙️ MERN Auth - Setup

## 🛠️ Backend (Express, MongoDB, JWT)

### 📦 Initialiser le projet
```bash
  mkdir backend
  cd backend
  npm init -y
```

### 📦 Installer les dépendances nécessaires
```bash
  npm install express mongoose bcryptjs jsonwebtoken cookie-parser nodemailer dotenv cors uuid
```

### 📁 Créer la structure
```bash
  mkdir controllers models routes middlewares utils
  touch app.js .env
```

### 🗂️ Exemple .env



```env
  PORT=5000
  MONGO_URL=mongodb://localhost:27017/mern-auth
  JWT_SECRET=secret_jwt_key
  CLIENT_URL=http://localhost:5173
  API_URL=http://localhost:5000
  EMAIL_USER=ton_email@gmail.com
  EMAIL_PASS=mot_de_passe_app
```

## 💻 Frontend (React + Vite + TypeScript + TailwindCSS + DaisyUI)

### ⚙️ Créer l’application Vite
```bash
  npm create vite@latest frontend -- --template react-js
  cd frontend
  npm install
```

### 🎨 Installer TailwindCSS & Daisyui
```bash
  npm install -D tailwindcss @tailwindcss/vite
  npm install -D daisyui@latest
```

### ⚙️ Configure (vite.config.ts)
```ts
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      react(),
      tailwindcss()
    ]
  })
```



### 📦 Import Tailwind & Daisyui css dans app.css ou index.css
```css
  @import "tailwindcss";
  @plugin "daisyui";
```


### 📦 Installer react-router-dom & axios

```bash
  npm install react-router-dom
  npm install axios
```

### 🗂️ Créer le fichier .env
```bash
  VITE_API_URL=http://localhost:5000/api
```

### 🗂️ Exemple d'import une variable env
```js
  const API_URL = import.meta.env.VITE_API_URL
```