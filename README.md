# Sistema de Gerenciamento de Colaboradores - IPDV

Este projeto consiste em uma aplicação fullstack para gerenciamento de colaboradores e cargos, desenvolvida como parte de um desafio técnico solicitado pela IPDV.

## 🧠 Visão Geral

A aplicação permite:
- Autenticação de usuários (login com JWT)
- Listagem de colaboradores
- Cadastro, edição e desativação de colaboradores
- Listagem e gerenciamento de cargos
- Interface amigável com design moderno utilizando Vuetify

---

## 🛠️ Tecnologias Utilizadas

### ✅ Backend
- **Node.js**
- **Express**
- **TypeORM**
- **JWT (JSON Web Token)**
- **PostgreSQL**
- **Docker / Docker Compose**

### ✅ Frontend
- **Vue 3** (Composition API)
- **Vuetify 3**
- **Vite**
- **Axios**

---

## 🚀 Execução do Projeto

### Pré-requisitos
- Docker e Docker Compose instalados

### Subindo o ambiente
Na raiz do projeto, execute:

```bash
docker compose up --build
```
Isso irá:
- Subir o banco PostgreSQL
- Rodar as migrations automaticamente
- Rodar o backend em http://localhost:3000
- Disponibilizar o frontend em http://localhost:5173

---

## 📂 Estrutura do Projeto
  
```
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── middlewares
│   │   ├── routes
│   │   └── database (migrations, entities)
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── views
│   │   ├── components
│   │   └── userModal
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 📸 Imagens da Aplicação

### 🔐 Tela de Login
