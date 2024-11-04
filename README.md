# Teste Técnico para Desenvolvedor Frontend

## Diretório de Usuários

Uma aplicação de página única (SPA) desenvolvida com React que exibe uma lista de usuários com recursos de filtro que persiste na URL.

![image](https://github.com/user-attachments/assets/5ff1674f-5249-4434-bb23-b60117d3b4f4)

## 🚀 Funcionalidades

- ✨ Listagem de usuários com dados da API JSONPlaceholder
- 🔍 Busca de usuários em tempo real
- 📱 Design responsivo
- 🔄 Alternância entre visualização em cards e tabela
- 🔗 Persistência do termo de busca na URL
- ♿ Componentes acessíveis
- 🎨 Estilização com Styled Components

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [RSPack](https://www.rspack.dev/) - Bundler de alta performance
- [React Router DOM](https://reactrouter.com/) - Roteamento para React
- [Styled Components](https://styled-components.com/) - Estilização com CSS-in-JS
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/) - Componentes acessíveis
- [Jest](https://jestjs.io/) - Framework de testes
- [Testing Library](https://testing-library.com/) - Utilitários para testes

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (versão 8 ou superior)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:
```bash
pnpm install
```

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
pnpm dev

# Cria build de produção
pnpm build

# Executa os testes
pnpm test

# Executa os testes em modo watch
pnpm test:watch

# Executa os testes com cobertura
pnpm test:coverage

# Executa o linter
pnpm lint

# Formata o código
pnpm format
```

## 🏗️ Estrutura do Projeto

```
src/
├── api/            # Funções de API
├── components/     # Componentes React
├── hooks/          # Custom Hooks
├── types/          # Definições de tipos TypeScript
├── __tests__/      # Testes
├── App.tsx         # Componente principal
└── index.tsx       # Ponto de entrada
```

## 🔍 Implementação

### API
A aplicação consome dados da API JSONPlaceholder:
- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Dados retornados incluem nome, email e telefone dos usuários

### Componentes Principais
- `UserDisplay`: Componente principal que gerencia a exibição dos usuários

### Hooks Personalizados
- `useUsers`: Gerenciamento do estado dos usuários e busca
- `useSearch`: Gerenciamento do termo de busca e URL

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop: Layout em grid com múltiplas colunas
- Tablet: Layout adaptativo com menos colunas
- Mobile: Layout em coluna única

## ♿ Acessibilidade

- Implementação completa de ARIA labels
- Suporte a navegação por teclado
- Score de 100 no Lighthouse

## 🧪 Testes

Os testes cobrem:
- Renderização inicial
- Funcionalidade de busca que persiste na URL 
- Alternância de visualização
- Tratamento de erros
- Estados de carregamento

Para verificar a cobertura dos testes:
```bash
pnpm test:coverage
```

---

Desenvolvido por [André Pelluzi](https://github.com/andrepelluzi)
