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
  npm install express mongoose bcryptjs jsonwebtoken cookie-parser nodemailer dotenv cors
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
  CLIENT_URL=http://localhost:3000
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

### 🎨 Installer TailwindCSS et DaisyUI
```bash
  npm install -D tailwindcss
  npx tailwindcss init -p
  npm install daisyui
```





