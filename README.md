# Refund App

Sistema de solicitação de reembolsos desenvolvido com React.

## Tecnologias

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **React Query** - Gerenciamento de estado assíncrono
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **Radix UI** - Componentes acessíveis
- **Axios** - Requisições HTTP
- **nuqs** - Sincronização de estado com URL

## Funcionalidades

- Listagem de reembolsos com paginação
- Busca por nome com debounce
- Criação de nova solicitação de reembolso
- Upload de comprovante (JPG, PNG, PDF)
- Validação de formulários
- Skeleton loading

## Como rodar

### Pré-requisitos

- Node.js 18+
- API rodando em `http://localhost:3333` ([refund-api](https://github.com/rocketseat-education/refund-api))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/fperdona/refund-app.git

# Acesse a pasta
cd refund-app

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## Estrutura de pastas

```
src/
├── assets/          # Ícones e imagens
├── components/      # Componentes da aplicação
├── core-components/ # Componentes base reutilizáveis
├── helpers/         # Funções utilitárias
├── hooks/           # Hooks customizados
├── pages/           # Páginas da aplicação
├── schemas/         # Schemas de validação (Zod)
└── services/        # Configuração de API
```
