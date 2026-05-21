#!/bin/sh
set -e

echo "======================================"
echo "  Iniciando contenedor MrFinance"
echo "======================================"

PROJECT_DIR="/app/mrfinance"

# Verificar que el proyecto existe
if [ ! -d "$PROJECT_DIR" ]; then
  echo ">>> ERROR: No se encontro el proyecto en $PROJECT_DIR"
  exit 1
fi

# ── Instalar dependencias del servidor ──────────────────────────────────────
echo ">>> Instalando dependencias del servidor..."
cd "$PROJECT_DIR/server"
npm install

# Dependencias que el codigo del servidor importa pero no estan en su package.json
echo ">>> Instalando dependencias adicionales del servidor (bcrypt, dotenv, nodemailer)..."
npm install bcrypt dotenv nodemailer
npm install multer path

# ── Instalar dependencias del cliente ───────────────────────────────────────
echo ">>> Instalando dependencias del cliente..."
cd "$PROJECT_DIR/client"
npm install

# ── Arrancar servidor y cliente ─────────────────────────────────────────────
echo "======================================"
echo "  MrFinance listo"
echo "  Client (Vite):  http://localhost:5173"
echo "  Server (API):   http://localhost:8081"
echo "======================================"

cd "$PROJECT_DIR"
exec concurrently -n SERVER,CLIENT -c blue,green \
  "cd $PROJECT_DIR/server && npx nodemon server.js" \
  "cd $PROJECT_DIR/client && npx vite --host --port 5173"
