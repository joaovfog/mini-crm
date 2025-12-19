# MiniCRM – Frontend React

Interface web para gerenciamento de clientes (MiniCRM), desenvolvida como teste técnico
para a vaga de Frontend React Developer.

## Objetivo

Criar uma aplicação frontend moderna utilizando React, Tailwind CSS e shadcn/ui,
integrada a uma API REST mockada, com foco em organização, UX, acessibilidade
e boas práticas de desenvolvimento.

---

## Tecnologias Utilizadas

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- TanStack Query (React Query)
- Axios
- React Hook Form + Zod
- JSON Server (Mock API via Docker)

---

## Funcionalidades

- Listagem de clientes
- Busca por nome ou e-mail
- Filtro por status (ativo / inativo)
- Visualização de detalhes do cliente
- Criação e edição de clientes
- Estados de loading, erro e lista vazia

---

## Principais Decisões de Implementação

A aplicação foi estruturada priorizando clareza de responsabilidades, experiência do usuário e boas práticas de frontend.

- Arquitetura baseada em componentes:

A UI foi dividida em componentes reutilizáveis (CustomerTable, CustomerFilters, CustomerDialog, CustomerForm), facilitando manutenção, testes e evolução do código.

- Gerenciamento de dados com Tanstack Query:

O Tanstack Query foi utilizado para centralizar a lógica de busca, criação, edição e exclusão dos clientes, garantindo cache automático, estados explícitos de loading e erro e atualização consistente da lista após mutações.

- Fomulários com React Hook Form + Zod:

A criação e edição de clientes utilizam validação baseada em schema, garantindo tipagem, mensagens de erro claras e melhor experiência de preenchimento.

- Tratamento explícito de estados da aplicação:

A interface diferencia claramento o loading inicial de dados, estado vazio (sem clientes cadastrados), estado vazio quando filtros/busca não retornar resultados e estado de erro ao falhar a comunicação com a API.

- Busca com debounce e filtros memorizados:

A busca por nome/e-mail utiliza debounce para evitar reprocessamentos desnecessários, e filtros/ordenação são memorizados com useMemo, melhorando performance e previsibilidade.

- UX e feedback ao usuário:

A aplicação fornece feedback visual consistente através de toasts para ações de sucesso/erro (criar, editar, excluir), estados visuais de carregamento e confirmação explícita para ações destrutivas (exclusão).

- API mockada com JSON Server via Docker:

O uso de JSON Server em container Docker permite simular uma API REST realista, mantendo o frontend desacoplado e pronto para integração futura com um backend real.

---

## Como rodar o projeto

### Pré-requisitos

- Node.js
- Docker
- npm

---

### Frontend

```bash
npm install
npm run dev
```

### Backend

Na raiz do projeto, execute o seguinte comando no PowerShell:

```bash
docker run -p 3001:80 -v "${PWD}\db.json:/data/db.json" clue/json-server --watch /data/db.json
```
