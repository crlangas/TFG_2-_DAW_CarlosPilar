#!/bin/sh
set -e

echo "======================================"
echo "  Iniciando contenedor Node.js"
echo "======================================"

# Si no existe package.json, inicializar proyecto
if [ ! -f /app/package.json ]; then
  echo ">>> No se encontró package.json. Creando proyecto..."

  cd /app

  npm init -y

  echo ">>> Instalando dependencias base (express, nodemon)..."
  npm install express
  npm install --save-dev nodemon

  # Añadir script "dev" al package.json
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.dev = 'nodemon index.js';
    pkg.main = 'index.js';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  "

  echo ">>> package.json configurado."
fi

# Si no existe index.js, crear uno de ejemplo
if [ ! -f /app/index.js ]; then
  echo ">>> No se encontró index.js. Creando servidor de ejemplo..."
  cat <<'EOF' > /app/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '¡Servidor Node.js funcionando!', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
EOF
  echo ">>> index.js creado."
fi

# Instalar dependencias si node_modules no existe
if [ ! -d /app/node_modules ]; then
  echo ">>> Instalando dependencias del proyecto..."
  cd /app && npm install
fi

echo ">>> Arrancando servidor con nodemon..."
cd /app
exec nodemon index.js
