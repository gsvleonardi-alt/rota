# Rota

SaaS simples de gestão operacional para empresas brasileiras de serviços de campo — ar-condicionado, elétrica, hidráulica, manutenção e instalação.

O dono da empresa vê a equipe, distribui os serviços do dia, acompanha o status e avisa o cliente no WhatsApp, sem planilha.

---

## Problema que resolve

Empresas pequenas de campo ainda operam no grupo de WhatsApp e na memória do dono:

- ninguém sabe com precisão onde cada técnico está
- os serviços do dia se perdem em mensagens
- o cliente cobra atualização e ninguém responde
- não existe um histórico claro do que foi feito

O resultado é atraso, retrabalho e dono preso no celular o dia inteiro.

## Solução

O **Rota** concentra o dia operacional em uma tela só:

1. o gestor entra, vê os serviços e a equipe
2. redistribui OS com um clique
3. o técnico atualiza o status no celular
4. o cliente recebe o recado pronto no WhatsApp
5. o histórico da OS fica registrado

Este repositório é um **MVP frontend** com dados de demonstração. Não exige backend para rodar.

## Principais funcionalidades

- Login simples (gestor e técnico)
- Dashboard do gestor com lista de serviços do dia
- Mapa ilustrativo com a posição da equipe (placeholder, sem chave de API)
- Redistribuição de serviços entre técnicos
- Tela do técnico com a agenda do dia
- Avanço de status: pendente → a caminho → em andamento → concluído
- Botão **Avisar no WhatsApp** (abre o `wa.me` com mensagem pronta)
- Histórico básico em cada ordem de serviço

## Como rodar o projeto localmente

Requisitos: [Node.js 18+](https://nodejs.org/) e npm.

```bash
git clone https://github.com/SEU_USUARIO/rota.git
cd rota
cp .env.example .env
npm install
npm start
```

No Windows (PowerShell):

```powershell
git clone https://github.com/SEU_USUARIO/rota.git
cd rota
Copy-Item .env.example .env
npm install
npm start
```

Ou use o script pronto:

```bash
# macOS / Linux
chmod +x start.sh && ./start.sh

# Windows
.\start.ps1
```

O app abre em [http://localhost:5173](http://localhost:5173).

### Contas de demonstração

| Perfil  | E-mail             | Senha  |
| ------- | ------------------ | ------ |
| Gestor  | `gestor@rota.app`  | `123456` |
| Técnico | `tecnico@rota.app` | `123456` |

Não há cadastro neste MVP. Os dados resetam ao recarregar a página (exceto a sessão, que fica no `localStorage`).

## Stack utilizada

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Dados mockados no frontend (sem banco)

O `.env` só define porta, nome do app e um placeholder de API para o próximo passo.

## Estrutura de pastas

```text
rota/
├── public/                 # favicon
├── src/
│   ├── components/         # JobCard, mapa, layout, badge
│   ├── context/            # autenticação e lista de serviços
│   ├── data/               # usuários, técnicos e OS de demo
│   ├── lib/                # formatação e mensagem de WhatsApp
│   ├── pages/              # Login, Dashboard, Técnico
│   ├── App.tsx             # rotas
│   └── main.tsx
├── .env.example
├── start.sh / start.ps1    # sobe o projeto com um comando
├── package.json
└── README.md
```

## Exemplos de uso

**Gestor, 7h30.** Marina entra com `gestor@rota.app`, vê 4 OS abertas, Carlos online e João offline. Move o vazamento de Pinheiros para a Ana e clica em *Avisar no WhatsApp*.

**Técnico, 8h45.** Carlos entra com `tecnico@rota.app`, toca em *Sair para o local* e depois em *Iniciar atendimento*. O status muda na hora no painel do gestor.

**Cliente.** Recebe algo como: *“Padaria São Jorge, o técnico já está a caminho.”*

Fluxo mental do MVP:

```text
Login → Dashboard (gestor) ou Meu dia (técnico)
      → atualiza status
      → abre WhatsApp com texto pronto
```

## Roadmap futuro

- [ ] Backend com autenticação real
- [ ] GPS ao vivo do técnico
- [ ] Mapa com Mapbox ou Google Maps
- [ ] Envio automático de WhatsApp (API oficial)
- [ ] App mobile para o técnico
- [ ] Relatórios semanais e histórico pesquisável
- [ ] Multi-empresa (white-label para prestadores)

## Como contribuir

1. Faça um fork e crie uma branch (`feat/mapa-real`, `fix/login`, etc.)
2. Mantenha o MVP simples: uma tela, um fluxo, um commit claro
3. Não commite `.env` nem credenciais
4. Abra um Pull Request descrevendo o que mudou e como testar

Sugestões boas para primeira contribuição: melhorar o mapa placeholder, persistir OS no `localStorage`, ou adicionar filtro por status.

## Licença

MIT. Veja o arquivo `LICENSE`.
