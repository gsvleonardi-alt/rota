$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Instale o Node.js 18+ em https://nodejs.org/ e tente de novo."
  exit 1
}

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Arquivo .env criado a partir do .env.example"
}

if (-not (Test-Path "node_modules")) {
  Write-Host "Instalando dependências..."
  npm install
}

Write-Host "Abrindo o Rota em http://localhost:5173"
npm start
