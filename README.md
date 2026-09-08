# 🚆 Sistema de Controle de Estoque

Sistema web desenvolvido para gerenciamento e controle de materiais, criado como projeto de portfólio para demonstrar conhecimentos em desenvolvimento web, lógica de programação e organização de aplicações.

## 🚀 Demonstração

### [Acessar o sistema funcionando](https://luiz1022.github.io/controle-estoque-/)

A aplicação pode ser acessada diretamente pelo navegador através do GitHub Pages.

> **Nota:** esta é uma versão demonstrativa do sistema, utilizando dados fictícios para permitir a navegação e interação com as funcionalidades.

---

## 📋 Funcionalidades

* 📊 Dashboard com indicadores do estoque
* 📦 Catálogo e inventário de materiais
* 🔎 Pesquisa por código ou descrição
* 🔽 Filtro por situação do estoque
* ⚠️ Identificação de materiais abaixo do estoque ideal
* 🚨 Identificação de materiais com estoque zerado
* 📥 Registro de entradas de materiais
* 📤 Registro de saídas de materiais
* 🔒 Validação de quantidade disponível
* 📜 Histórico de movimentações
* 💰 Cálculo do valor total do estoque
* 📱 Interface responsiva

---

## 🛠️ Tecnologias utilizadas

* **HTML5** — estrutura da aplicação
* **CSS3** — estilização e layout responsivo
* **JavaScript** — lógica, interações e gerenciamento dos dados
* **GitHub Pages** — hospedagem da aplicação

---

## 🏗️ Estrutura do projeto

```text
controle-estoque/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Responsável pela estrutura das páginas e componentes da aplicação.

### `style.css`

Responsável pelo layout, identidade visual, responsividade e componentes da interface.

### `script.js`

Responsável pela lógica do sistema, movimentações, atualização do estoque, filtros, dashboard e histórico.

---

## 📊 Módulos do sistema

### Dashboard

Apresenta uma visão geral do estoque através de indicadores como:

* quantidade de materiais;
* materiais abaixo do ideal;
* materiais zerados;
* valor total do estoque;
* materiais críticos;
* movimentações recentes.

### Catálogo e Inventário

Permite consultar os materiais cadastrados e acompanhar:

* código;
* descrição;
* quantidade ideal;
* quantidade atual;
* preço unitário;
* valor total;
* situação do estoque.

### Lançar Movimentação

Permite registrar:

* entradas;
* saídas;
* quantidade movimentada;
* observações.

O sistema realiza validações para impedir, por exemplo, uma saída maior que o saldo disponível.

### Histórico

Mantém o registro das movimentações realizadas, apresentando:

* data;
* tipo de movimentação;
* código;
* material;
* quantidade;
* saldo anterior;
* novo saldo;
* observação.

---

## 🎯 Objetivo do projeto

O projeto foi desenvolvido como parte do meu portfólio profissional, com o objetivo de demonstrar na prática conhecimentos em:

* desenvolvimento web;
* JavaScript;
* manipulação de dados;
* lógica de programação;
* criação de interfaces;
* validação de informações;
* organização de código;
* desenvolvimento de sistemas de gestão.

---

## 🔧 Próximas melhorias

Entre as possíveis evoluções do projeto estão:

* integração com banco de dados;
* autenticação de usuários;
* controle de permissões;
* API para comunicação com backend;
* relatórios de estoque;
* exportação de dados;
* notificações automáticas;
* integração com sistemas corporativos.

---

## 👨‍💻 Desenvolvedor

**Luiz Ferreira**

Projeto desenvolvido para composição de portfólio profissional.

### 🔗 Projeto online

**[🚀 Acessar Controle de Estoque](https://luiz1022.github.io/controle-estoque-/)**

---

⭐ Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório.
