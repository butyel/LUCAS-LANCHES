# Lucas Lanches - Site de Delivery

Site completo para a hamburgueria **Lucas Lanches**, inspirado na estrutura do
Burger King Brasil, mas com identidade visual própria a partir da logomarca da
marca.

## Stack

- [Next.js](https://nextjs.org) (App Router) + **TypeScript**
- [Tailwind CSS](https://tailwindcss.com)
- Layout mobile-first, imagens otimizadas com o componente `next/image` (WebP/AVIF)
- Fontes do Google Fonts: **Kaushan Script** (assinatura) e **Bebas Neue** (bloco)

## Requisitos

- Node.js 18.18 ou superior (recomendado 20+)

## Instalacao e execucao

```bash
# instala as dependencias
npm install

# roda em modo desenvolvimento
npm run dev
# acesse http://localhost:3000

# build de producao
npm run build

# servidor de producao
npm start

# verificacoes
npm run typecheck   # checagem de tipos
npm run lint        # lint
```

## Estrutura de pastas

```
src/
  app/               # rotas (App Router)
    page.tsx         # pagina inicial (todas as secoes)
    cardapio/        # /cardapio
    cupons/          # /cupons
    blog/            # /blog
    blog/[slug]/     # /blog/nome-do-post
    sobre-nos/       # /sobre-nos
    layout.tsx       # layout geral (header, footer, SEO)
    sitemap.ts       # sitemap.xml automatico
    robots.ts        # robots.txt
  components/        # Header, Hero, Cardapio, Cupons, Promocoes,
                     # Institucional, Avaliacoes, Blog, Footer, WhatsAppButton
  data/              # arquivos JSON editaveis (sem mexer no codigo)
  lib/               # utilitarios (sitio, formatacao)
```

## Como editar os dados (sem mexer no codigo)

Todos os textos, precos e links ficam em arquivos JSON dentro de `src/data/`
e em `src/lib/site.ts`.

### 1. Contato, endereco, WhatsApp e redes sociais

Abra **`src/lib/site.ts`** e altere o objeto `siteConfig`:

```ts
whatsapp: "5518997861957",        // numero com DDI e DDD, so digitos
phoneDisplay: "(18) 99786-1957",  // como aparece no site
email: "contato@lucaslanches.com.br",
address: {
  street: "Rua Jose Dirceu da Silva, 3-128",
  district: "Granjas Agricolas Helvecio",
  city: "Presidente Epitacio",
  state: "SP",
  cep: "19475-336",
},
hours: "Ter a Dom, das 18h as 23h",
deliveryFreeAbove: 79,           // valor minimo p/ frete gratis (use no cartaz)
```

> Ajuste tambem `url` (dominio real), `social` (links reais de Instagram e
> Facebook) e `email`. O botao de Delivery/WhatsApp usa o campo `whatsapp`.

### 2. Cardapio

Edite **`src/data/cardapio.json`**. Cada produto:

```jsonc
{
  "id": "burger-classico",        // chave unica
  "categoria": "burgers",          // categoria interna (slug)
  "categoriaNome": "Burgers",      // nome mostrado no filtro
  "nome": "Classic Lucas",
  "descricao": "Breve texto do item.",
  "preco": 26.9,                   // preco atual
  "precoPromo": null,              // preco promocional (ou null)
  "imagem": "/images/burgers/classic-lucas.svg",
  "destaque": true
}
```

Para mudar o preco promocional basta preencher `precoPromo`. Itens com
`precoPromo` entram automaticamente no carrossel de promocoes.

### 3. Cupons

Edite **`src/data/cupons.json`**. Ajuste `codigo`, `titulo`, `descricao`,
`validade`, `condicao` e `ativo`.

### 4. Avaliacoes

Edite **`src/data/avaliacoes.json`** (nome, nota de 1 a 5, comentario).

### 5. Blog

Edite **`src/data/blog.json`**. Cada post usa um `slug` em minusculas e sem
acento (ex.: `como-montar-o-burger-perfeito`) para criar a URL. A pasta
`conteudo` sao paragrafos do texto.

### 6. Imagens

As imagens estao em `public/images/`. Troque os arquivos `.svg` de exemplo por
imagens reais em **WebP** (largura de 400 a 960px). O `next/image` otimiza e
aplica lazy loading automaticamente.

### 7. Textos gerais (titulos, banner, botoes)

Textos como o aviso rotativo do topo e a chamada do Hero ficam no proprio
componente (`src/components/Header.tsx`, `src/components/Hero.tsx`).

## SEO

- Metadata unica por pagina (title/description) em cada `page.tsx`.
- Open Graph aponta para `/images/og.svg` como imagem padrao (troque por uma
  real em producao).
- `sitemap.xml` e `robots.txt` gerados automaticamente.
- JSON-LD de tipo `Restaurant` (no layout) com nome, endereco, telefone,
  horario e faixa de preco - tudo vindo de `site.ts`.

## Acessibilidade e performance

- Contraste AA em toda a paleta (verificado no CSS).
- Todos os botoes possuem `aria-label`.
- Menu navegavel por teclado (Tab, Enter, Esc fecha o mobile).
- Imagens fora da primeira dobra com lazy loading e `priority` apenas no Hero.
- Lazy loading das imagens fora do hero; objetivo 90+ no Lighthouse.