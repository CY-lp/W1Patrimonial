# Plataforma de Consultoria Patrimonial - W1 Capital

Aplicação fullstack desenvolvida durante um hackaton para facilitar o planejamento e gestão patrimonial de famílias com grandes volumes de ativos. A plataforma permite visualizar, estruturar e acompanhar holdings familiares de forma intuitiva, segura e acessível, mesmo para usuários com pouca familiaridade com tecnologia.

---

## Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- Node.js v20.x  
- PostgreSQL v16  
- Git  
- Yarn ou NPM  

Instale o Node.js e o PostgreSQL conforme a documentação oficial de cada ferramenta.

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seuusuario/consultoria-patrimonial.git
cd consultoria-patrimonial
```

### Backend

Instale as dependências do backend:

```bash
cd backend
npm install
```

Crie um banco de dados PostgreSQL e configure o arquivo `.env` com suas variáveis de ambiente (incluindo as chaves do Google OAuth para autenticação).

Rode as migrações:

```bash
npm run migrate
```

Inicie o servidor backend:

```bash
npm run dev
```

### Frontend

Abra um novo terminal, acesse a pasta do frontend e instale as dependências:

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env` na pasta `frontend` com as variáveis necessárias para o Google Auth (exemplo: `VITE_GOOGLE_CLIENT_ID`).

Inicie o frontend:

```bash
npm run dev
```

---

## Autenticação

O sistema utiliza autenticação via Google além do login tradicional. Para usar o login com Google, configure as credenciais OAuth tanto no backend quanto no frontend, conforme a documentação do Google Cloud.

---

## Construído com

- **Node.js** – Backend da aplicação  
- **PostgreSQL** – Banco de dados relacional  
- **React** – Interface do usuário  
- **Google OAuth** – Autenticação de usuários

---

## Autores

- [Leunam Sousa de Jesus](https://github.com/leeunam) – Backend, Banco de Dados e Apresentação do Pitch
- [Pedro Jorge Alves Soares](https://github.com/PedroJorgeSA) – Prototipagem, Front-End e Design

---

## 📄 Licença

Este projeto está sob a licença MIT – veja o arquivo `LICENSE.md` para detalhes.