#!/bin/sh
set -e

echo "======================================"
echo "  Iniciando contenedor Node.js"
echo "======================================"

# Si no existe package.json, inicializar proyecto
if [ ! -f /app/mrfinance ]; then
  echo ">>> No se encontro el proyecto mrfinance Error"

  cd /app

  npm init -y

  echo ">>> Instalando dependencias base (express, nodemon, mysql)..."
  npm install express
  npm install --save-dev nodemon
  npm install mysql2
  npm install cors

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


# Instalar dependencias si node_modules no existe
if [ ! -d /app/node_modules ]; then
  echo ">>> Instalando dependencias del proyecto..."
  cd /app && npm install
fi

echo ">>> Arrancando servidor con nodemon..."
cd /app
exec nodemon index.js
