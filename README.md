# Ig.News 🚀

Ig.News é um site de assinatura de notícias focado no mundo do React. Os usuários podem se inscrever para ter acesso a todas as publicações por uma taxa mensal. Este projeto utiliza várias tecnologias modernas para proporcionar uma experiência de usuário otimizada.

## Tecnologias Utilizadas 💻

- **Next.js (versão 10.0.0.9)**: Framework React para construção de aplicações web com renderização do lado do servidor e geração estática.
- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **SCSS (Sass)**: Pré-processador CSS para facilitar a escrita de estilos de forma mais eficiente e organizada.
- **Stripe**: Plataforma de pagamento utilizada para gerenciar assinaturas.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **Node.js**: Ambiente de execução JavaScript server-side.
- **Axios**: Cliente HTTP baseado em Promises para o navegador e node.js.
- **FaunaDB**: Banco de dados serverless otimizado para uso com GraphQL.
- **Prismic**: CMS headless para gerenciamento de conteúdo.

## Estrutura do Projeto 📂

A estrutura do projeto está organizada da seguinte forma:

```
public/
  images/
    favicon.png
    ig.news.svg
    Mulher.svg
src/
  components/
    ActiveLink/
      index.tsx
      styles.module.scss
    Header/
      index.tsx
      styles.module.scss
    SigninButton/
      index.tsx
      styles.module.scss
    SubscribeButton/
      index.tsx
      styles.module.scss
  pages/
    api/
    posts/
    _app.tsx
    _document.tsx
    home.module.scss
    index.tsx
  services/
    stripe.ts
  styles/
    globals.scss
```

### Descrição dos Diretórios e Arquivos Principais 🗂️

- **public/**: Contém as imagens e o favicon utilizado no site.
- **src/components/**: Contém os componentes reutilizáveis do projeto.
  - **ActiveLink/**: Componente para navegação ativa.
  - **Header/**: Componente do cabeçalho do site.
  - **SigninButton/**: Componente do botão de login.
  - **SubscribeButton/**: Componente do botão de assinatura.
- **src/pages/**: Contém as páginas do Next.js.
  - **api/**: Diretório para rotas de API.
  - **posts/**: Diretório para as páginas de postagens.
  - **_app.tsx**: Arquivo principal da aplicação.
  - **_document.tsx**: Arquivo de configuração do documento HTML.
  - **home.module.scss**: Estilos específicos da página inicial.
  - **index.tsx**: Página inicial da aplicação.
- **src/services/**: Contém serviços utilizados na aplicação.
  - **stripe.ts**: Configuração do Stripe para gerenciamento de pagamentos.
- **src/styles/**: Contém estilos globais.
  - **globals.scss**: Estilos globais da aplicação.

## Instalação e Configuração ⚙️

1. Clone o repositório:

```bash
git clone https://github.com/thaleson/IgNews
```

2. Navegue até o diretório do projeto:

```bash
cd ig.news
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env.local` na raiz do projeto e adicione suas variáveis de ambiente do Stripe:

```
STRIPE_API_KEY=your_stripe_api_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

5. Faça login no Git para acessar o repositório de dependências (se necessário):

```bash
git login
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Uso 🖥️

- Acesse `http://localhost:3000` no seu navegador para visualizar a aplicação.
- Clique em "Subscribe Now" para assinar as publicações e obter acesso ao conteúdo exclusivo.

## Contribuição 🤝

1. Faça um fork do projeto.
2. Crie uma nova branch para suas alterações:

```bash
git checkout -b minha-feature
```

3. Faça commit das suas alterações:

```bash
git commit -m 'Minha nova feature'
```

4. Envie para a branch original:

```bash
git push origin minha-feature
```

5. Abra um Pull Request para revisão.

## Licença 📜

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---



## Autor 👨‍💻

Este projeto foi desenvolvido por **Thaleson Silva**, Desenvolvedor Full Stack.

- [LinkedIn](https://www.linkedin.com/in/thaleson-silva-9298a0296/)

