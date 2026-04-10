# 🌐 Connect Hub - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Uma plataforma moderna de rede social para conectar pessoas e compartilhar ideias**

*A modern social network platform to connect people and share ideas*

[Demo](https://connect-hub-frontend.vercel.app) • [Reportar Bug](https://github.com/RondneyLoiola/connect_hub-frontend/issues) • [Solicitar Recurso](https://github.com/RondneyLoiola/connect_hub-frontend/issues)

</div>

---

## 📋 Sobre o Projeto / About the Project

**PT-BR:**
Connect Hub é uma aplicação web de rede social que permite aos usuários criar posts, interagir com conteúdo de outros usuários, curtir publicações e construir uma comunidade online. O projeto foi desenvolvido com tecnologias modernas como React, Vite e TailwindCSS, oferecendo uma experiência rápida e responsiva.

**EN:**
Connect Hub is a social network web application that allows users to create posts, interact with other users' content, like publications, and build an online community. The project was developed with modern technologies like React, Vite, and TailwindCSS, offering a fast and responsive experience.

---

## ✨ Funcionalidades / Features

- ✅ **Autenticação de usuários** / User authentication
- ✅ **Criação e edição de posts** / Create and edit posts
- ✅ **Sistema de curtidas** / Like system
- ✅ **Perfil de usuário personalizável** / Customizable user profile
- ✅ **Feed de publicações** / Publications feed
- ✅ **Busca de usuários** / User search
- ✅ **Visualização de detalhes de posts** / Post details view
- ✅ **Interface responsiva** / Responsive interface
- ✅ **Validação de formulários** / Form validation

---

## 🚀 Tecnologias / Technologies

Este projeto foi construído com / This project was built with:

### Core
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[Vite 7](https://vitejs.dev/)** - Build tool ultra-rápida
- **[React Router 7](https://reactrouter.com/)** - Roteamento da aplicação

### Estilização / Styling
- **[TailwindCSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Formulários / Forms
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Yup](https://github.com/jquense/yup)** - Validação de schemas

### HTTP & Estado / HTTP & State
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Notificações toast

### Qualidade de Código / Code Quality
- **[ESLint](https://eslint.org/)** - Linting JavaScript
- **[Biome](https://biomejs.dev/)** - Formatter e linter

---

## 📦 Instalação / Installation

### Pré-requisitos / Prerequisites

```bash
Node.js >= 18.0.0
npm ou yarn ou pnpm
```

### Passo a passo / Step by step

1️⃣ **Clone o repositório / Clone the repository**

```bash
git clone https://github.com/RondneyLoiola/connect_hub-frontend.git
cd connect_hub-frontend
```

2️⃣ **Instale as dependências / Install dependencies**

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install
```

3️⃣ **Configure as variáveis de ambiente / Set up environment variables**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

4️⃣ **Inicie o servidor de desenvolvimento / Start development server**

```bash
# Com npm
npm run dev

# Com yarn
yarn dev

# Com pnpm
pnpm dev
```

5️⃣ **Acesse a aplicação / Access the application**

Abra seu navegador em `http://localhost:5173`

---

## 🏗️ Estrutura do Projeto / Project Structure

```
connect_hub-frontend/
├── src/
│   ├── Components/      # Componentes reutilizáveis
│   ├── Layout/          # Componentes de layout
│   ├── Pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── NewPost.jsx
│   │   ├── PostDetails.jsx
│   │   ├── Liked.jsx
│   │   ├── MyPosts.jsx
│   │   ├── SearchUsers.jsx
│   │   └── UserDetails.jsx
│   ├── hooks/           # Custom React hooks
│   ├── routes/          # Configuração de rotas
│   ├── services/        # Serviços de API
│   ├── utils/           # Funções utilitárias
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── public/              # Arquivos públicos
├── Dockerfile           # Configuração Docker
├── vite.config.js       # Configuração Vite
├── package.json
└── README.md
```

---

## 🐳 Docker

**Construir a imagem / Build the image:**

```bash
docker build -t connect-hub-frontend .
```

**Executar o container / Run the container:**

```bash
docker run -p 5173:5173 connect-hub-frontend
```

---

## 📝 Scripts Disponíveis / Available Scripts

| Comando | Descrição / Description |
|---------|-------------------------|
| `npm run dev` | Inicia o servidor de desenvolvimento / Starts development server |
| `npm run build` | Cria build de produção / Creates production build |
| `npm run preview` | Visualiza build de produção / Previews production build |
| `npm run lint` | Executa linter / Runs linter |

---

## 🤝 Contribuindo / Contributing

**PT-BR:**
Contribuições são sempre bem-vindas! Sinta-se livre para abrir issues e pull requests.

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**EN:**
Contributions are always welcome! Feel free to open issues and pull requests.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 Licença / License

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

This project is under the MIT license. See the `LICENSE` file for more details.

---

## 👤 Autor / Author

**Rondney Loiola**

- GitHub: [@RondneyLoiola](https://github.com/RondneyLoiola)
- Backend: https://github.com/RondneyLoiola/connect_hub-backend
- Deploy: connect-hub-app.vercel.app/

---

## 🙏 Agradecimentos / Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

**⭐ If this project helped you, consider giving it a star!**

Made with ❤️ by Rondney Loiola

</div>
