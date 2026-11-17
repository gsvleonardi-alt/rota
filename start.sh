#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Instale o Node.js 18+ em https://nodejs.org/ e tente de novo."
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Arquivo .env criado a partir do .env.example"
fi

if [ ! -d node_modules ]; then
  echo "Instalando dependências..."
  npm install
fi

echo "Abrindo o Rota em http://localhost:5173"
npm start
