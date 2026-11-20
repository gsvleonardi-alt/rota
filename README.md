# ROTA

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

**ROTA organiza a operação de equipes de serviço de campo.** Feito para empresas de climatização, hidráulica, elétrica, manutenção e instalação que precisam coordenar técnicos e clientes sem depender de planilhas e conversas dispersas.

> Projeto inscrito no Hack Brasil 2026 — trilha **Logística & Automação**.

## O problema

Em muitas empresas de serviço de campo, a agenda fica espalhada entre planilhas, mensagens e a memória do gestor. Ordens se perdem, é difícil saber quem está atendendo cada chamado, o cliente não recebe atualizações e o histórico do serviço fica incompleto. Isso gera atrasos, retrabalho e mais tempo de gestão ao telefone.

## A solução

ROTA é um SaaS de gestão operacional que reúne agendamento e ordens de serviço, distribuição de tarefas, acompanhamento de técnicos e comunicação com o cliente pelo WhatsApp. O gestor acompanha a operação em um painel; o técnico consulta sua agenda e atualiza o andamento; a mensagem ao cliente pode ser preparada no WhatsApp.

Este repositório contém um **MVP frontend** com dados de demonstração. O botão de WhatsApp abre uma conversa com texto preenchido; o envio automatizado por uma API e o rastreamento GPS real ainda não estão implementados.

## Funcionalidades do MVP

- Acesso de demonstração para gestor e técnico.
- Painel com ordens do dia e distribuição entre técnicos.
- Agenda do técnico e atualização de status da ordem.
- Mapa ilustrativo da equipe (sem GPS ou chave de mapas).
- Atalho `wa.me` com mensagem pronta para o cliente.
- Histórico básico por ordem de serviço.

## Tecnologias

- **React 18** para a interface.
- **TypeScript** para tipagem estática.
- **Vite** para desenvolvimento e build.
- **Tailwind CSS** para estilos.
- **React Router** para navegação.

## Como executar

Requisitos: Node.js 18 ou superior e npm.

```bash
git clone https://github.com/gsvleonardi-alt/rota.git
cd rota
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`). Para gerar a versão de produção, execute `npm run build`.

### Contas de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Gestor | `gestor@rota.app` | `123456` |
| Técnico | `tecnico@rota.app` | `123456` |

Não use essas credenciais como autenticação de produção. O MVP usa dados mockados no frontend; ordens e clientes não têm persistência em backend.

## Capturas de tela

Ainda não há screenshots ou mockups do produto em `public/` ou `dist/`. A pasta `public/` contém apenas o favicon.

## Contribuição

Contribuições são bem-vindas!

1. Faça um fork e crie uma branch descritiva, por exemplo `feat/persistencia` ou `fix/status-os`.
2. Instale as dependências com `npm install` e rode o projeto com `npm run dev`.
3. Mantenha as alterações focadas e não inclua arquivos `.env`, credenciais ou dados de clientes.
4. Abra um Pull Request explicando a mudança e como validá-la.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE).
